import { gql, useMutation } from "@apollo/client";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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
import { ReviewForm } from "./ReviewForm";

interface IReviewsDrawerProps {
  userData: meQuery;
  podcastId: number;
  podcastCreatorId: number;
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

export const ReviewsDrawer: React.FC<IReviewsDrawerProps> = ({
  userData,
  podcastId,
  podcastCreatorId,
  isReviewsOpen,
  setIsReviewsOpen,
}) => {
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const f = useForm<IFormProps>({ mode: "onChange" });

  const [
    getReviewsLazyQuery,
    { data: reviewData, loading, fetchMore },
  ] = useGetReviewsLazyQuery(podcastId);

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
          text: f.getValues().text,
          createdAt: new Date(),
          updatedAt: new Date(),
          creator: {
            __typename: "Users",
            id: userData.me.id,
            username: userData.me.username,
          },
        };
        client.writeQuery<getReviewsQuery, getReviewsQueryVariables>({
          query: GET_REVIEWS_QUERY,
          variables: {
            input: { podcastId },
          },
          data: {
            getReviews: {
              ...previousQuery.getReviews,
              reviews: previousQuery.getReviews.reviews
                ? [newReview, ...previousQuery.getReviews.reviews].slice(0, 10)
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
    const { text } = f.getValues();
    await createReviewMutation({ variables: { input: { podcastId, text } } });
    f.setValue("text", "", { shouldValidate: true });
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
        className={`fixed z-20 top-0 w-96 h-screen p-5 overflow-y-scroll bg-white shadow-xl transition-all duration-700 ${
          isReviewsOpen ? "left-0" : "-left-96"
        }`}
      >
        <h3 className="font-semibold text-lg mr-2">Reviews</h3>
        <FontAwesomeIcon
          className="absolute top-4 right-4 cursor-pointer text-gray-400 hover:text-gray-600"
          onClick={() => setIsReviewsOpen(false)}
          icon={faTimes}
        />
        <FormProvider {...f}>
          <ReviewForm submitLoading={createReviewLoading} onSubmit={onSubmit} />
        </FormProvider>
        {loading ? null : (
          <ul className="grid gap-px bg-gray-200">
            {reviewData?.getReviews.reviews?.map((review) => {
              return (
                <ReviewBlock
                  review={review}
                  userData={userData}
                  podcastCreatorId={podcastCreatorId}
                  key={review.id}
                />
              );
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
