import { gql, useMutation } from "@apollo/client";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { client } from "../apollo";
import { computeTimelapse } from "../helpers";
import {
  editReviewMutation,
  editReviewMutationVariables,
} from "../__generated__/editReviewMutation";
import { getReviewsQuery_getReviews_reviews } from "../__generated__/getReviewsQuery";
import { meQuery } from "../__generated__/meQuery";
import { Avatar } from "./Avatar";
import { ReviewForm } from "./ReviewForm";

interface IReviewBlockProps {
  review: getReviewsQuery_getReviews_reviews;
  userData: meQuery;
  podcastCreatorId: number;
}

interface IFormProps {
  text: string;
}

const EDIT_REVIEW_MUTATION = gql`
  mutation editReviewMutation($input: EditReviewInput!) {
    editReview(input: $input) {
      ok
      err
    }
  }
`;

export const ReviewBlock: React.FC<IReviewBlockProps> = ({
  review,
  userData,
  podcastCreatorId,
}) => {
  const [, setState] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const pRef = useRef<HTMLParagraphElement | null>(null);
  const f = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: { text: review.text },
  });

  useEffect(() => {
    setState((prev) => !prev);
  }, [pRef]);

  const onCompleted = (data: editReviewMutation) => {
    const {
      editReview: { ok, err },
    } = data;
    if (ok) {
      const { text } = f.getValues();
      client.writeFragment<getReviewsQuery_getReviews_reviews>({
        id: `Review:${review.id}`,
        fragment: gql`
          fragment EditedReview on Review {
            id
            text
            createdAt
            updatedAt
            creator {
              id
              username
            }
          }
        `,
        data: { ...review, text, updatedAt: new Date() },
      });
    } else {
      console.log(err);
    }
  };

  const [editReviewMutation, { loading: editReviewLoading }] = useMutation<
    editReviewMutation,
    editReviewMutationVariables
  >(EDIT_REVIEW_MUTATION, { onCompleted });

  const onSubmit = async () => {
    const { text } = f.getValues();
    await editReviewMutation({
      variables: { input: { reviewId: review.id, text } },
    });
    setIsEditMode(false);
    f.reset({ text });
  };

  return (
    <li className="py-4 bg-white">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <Avatar
            src={review.creator.avatarUrl ?? ""}
            username={review.creator.username}
            size="sm"
          />
          <h6 className="ml-2 text-sm text-gray-900">
            {review.creator.username}{" "}
            {podcastCreatorId === review.creator.id && <span>🎙</span>}
          </h6>
        </div>
        {userData.me.id === review.creator.id && (
          <FontAwesomeIcon
            className="text-gray-400 text-sm cursor-pointer hover:text-gray-700 active:text-gray-500"
            onClick={() => setIsEditMode(!isEditMode)}
            icon={faEdit}
          />
        )}
      </div>
      {isEditMode ? (
        <FormProvider {...f}>
          <ReviewForm submitLoading={editReviewLoading} onSubmit={onSubmit} />
        </FormProvider>
      ) : (
        <p
          className="text-gray-800 text-sm overflow-ellipsis overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
          }}
          ref={pRef}
        >
          {review.text}
          {new Date(review.createdAt).getTime() !==
            new Date(review.updatedAt).getTime() && (
            <span className="text-xs text-gray-500"> (edited)</span>
          )}
        </p>
      )}
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">
          {computeTimelapse(review.createdAt)}
        </span>
        {pRef.current && pRef.current.offsetHeight < pRef.current.scrollHeight && (
          <span
            className="text-sm underline cursor-pointer"
            onClick={() => {
              if (pRef.current) {
                pRef.current.style.display = "block";
                pRef.current.style.webkitLineClamp = "initial";
                setState((prev) => !prev);
              }
            }}
          >
            Read more
          </span>
        )}
      </div>
    </li>
  );
};
