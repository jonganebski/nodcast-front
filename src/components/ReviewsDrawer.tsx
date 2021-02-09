import { gql, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { client } from "../apollo";
import {
  GET_REVIEWS_QUERY,
  useGetReviewsLazyQuery,
} from "../hooks/useGetReviewsQuery";
import {
  createReviewMutation,
  createReviewMutationVariables,
} from "../__generated__/createReviewMutation";
import {
  getReviewsQuery,
  getReviewsQueryVariables,
  getReviewsQuery_getReviews_reviews,
} from "../__generated__/getReviewsQuery";
import { meQuery } from "../__generated__/meQuery";
import { Button } from "./Button";
import { ReviewBlock } from "./ReviewBlock";

interface IReviewsDrawerProps {
  userData: meQuery;
  myRating: number | undefined;
  podcastId: number;
  isReviewsOpen: boolean;
  setIsReviewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IFormProps {
  text: string;
}

const CREATE_REVIEW_MUTATION = gql`
  mutation createReviewMutation($input: CreateReviewInput!) {
    createReview(input: $input) {
      ok
      err
      id
    }
  }
`;

const REVIEW_MAX_LENGTH = 1000;

export const ReviewsDrawer: React.FC<IReviewsDrawerProps> = ({
  userData,
  myRating,
  podcastId,
  isReviewsOpen,
  setIsReviewsOpen,
}) => {
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState,
    setValue,
    watch,
  } = useForm<IFormProps>({ mode: "onChange" });

  const [
    getReviewsLazyQuery,
    { data: reviewData, loading, fetchMore },
  ] = useGetReviewsLazyQuery(podcastId);

  console.log(reviewData);

  useEffect(() => {
    if (isReviewsOpen) {
      getReviewsLazyQuery({ variables: { input: { podcastId } } });
    }
  }, [getReviewsLazyQuery, isReviewsOpen, podcastId]);

  const onCompleted = (data: createReviewMutation) => {
    const {
      createReview: { ok, err, id },
    } = data;
    if (ok && id) {
      const previousQuery = client.readQuery<
        getReviewsQuery,
        getReviewsQueryVariables
      >({
        query: GET_REVIEWS_QUERY,
        variables: {
          input: { podcastId },
        },
      });
      if (previousQuery) {
        const newReview: getReviewsQuery_getReviews_reviews = {
          __typename: "Review",
          id,
          text: getValues().text,
          creator: {
            __typename: "Users",
            username: userData.me.username,
            ratings: myRating
              ? [{ __typename: "Rating", rating: myRating }]
              : [],
          },
        };
        console.log(previousQuery.getReviews.reviews);
        client.writeQuery<getReviewsQuery, getReviewsQueryVariables>({
          query: GET_REVIEWS_QUERY,
          variables: {
            input: { podcastId },
          },
          data: {
            getReviews: {
              ...previousQuery.getReviews,
              reviews: previousQuery.getReviews.reviews
                ? [
                    newReview,
                    ...previousQuery.getReviews.reviews.slice(
                      0,
                      previousQuery.getReviews.reviews.length - 1
                    ),
                  ]
                : [newReview],
            },
          },
        });
      }
    } else {
      console.log(err);
    }
  };

  const [createReviewMutation, { loading: createReviewLoading }] = useMutation<
    createReviewMutation,
    createReviewMutationVariables
  >(CREATE_REVIEW_MUTATION, { onCompleted });

  const onSubmit = async () => {
    const { text } = getValues();
    await createReviewMutation({ variables: { input: { podcastId, text } } });
    setValue("text", "", { shouldValidate: true });
  };

  const fetchMoreReviews = async () => {
    if (reviewData?.getReviews.currentPage) {
      setFetchMoreLoading(true);
      // @ts-ignore
      await fetchMore({
        variables: {
          input: { podcastId, page: reviewData.getReviews.currentPage + 1 },
        },
        updateQuery: (previousData, { fetchMoreResult }) => {
          if (
            previousData.getReviews.reviews &&
            fetchMoreResult?.getReviews.reviews
          ) {
            return {
              getReviews: {
                ...fetchMoreResult.getReviews,
                reviews: [
                  ...previousData.getReviews.reviews,
                  ...fetchMoreResult.getReviews.reviews,
                ],
              },
            };
          } else {
            return previousData;
          }
        },
      });
      setFetchMoreLoading(false);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 bg-gray-700 w-full h-full transition-all duration-700 ${
          isReviewsOpen
            ? "opacity-40 cursor-pointer"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          setIsReviewsOpen(false);
        }}
      />
      <section
        className={`fixed top-0 w-96 h-screen p-5 overflow-y-scroll bg-white shadow-xl transition-all duration-700 ${
          isReviewsOpen ? "left-0" : "-left-96"
        }`}
      >
        <h3 className="font-semibold text-lg">Reviews</h3>
        <FontAwesomeIcon
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => setIsReviewsOpen(false)}
          icon={faTimes}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end mb-1">
            <span
              className={`text-sm ${
                errors.text?.type === "maxLength"
                  ? "text-red-500"
                  : "text-gray-600"
              }`}
            >{`(${watch().text?.length}/${REVIEW_MAX_LENGTH})`}</span>
          </div>
          <textarea
            className="w-full h-28 border rounded-md resize-none p-3 text-sm focus:outline-none focus:border-gray-400"
            ref={register({ required: true, maxLength: REVIEW_MAX_LENGTH })}
            name="text"
          />
          <div className="flex justify-end">
            <Button
              disabled={!formState.isValid || createReviewLoading}
              loading={createReviewLoading}
              text="Submit"
            />
          </div>
        </form>
        {loading ? null : (
          <ul className="grid gap-px bg-gray-200">
            {reviewData?.getReviews.reviews?.map((review) => {
              return <ReviewBlock review={review} key={review.id} />;
            })}
          </ul>
        )}
        {reviewData?.getReviews.currentPage !==
          reviewData?.getReviews.totalPages && (
          <div className="flex justify-center">
            <Button
              onClick={fetchMoreReviews}
              text="Load more"
              disabled={fetchMoreLoading}
              loading={fetchMoreLoading}
            />
          </div>
        )}
      </section>
    </>
  );
};
