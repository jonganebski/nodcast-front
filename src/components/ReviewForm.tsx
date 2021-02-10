import React from "react";
import { useFormContext } from "react-hook-form";
import { REVIEW_MAX_LENGTH } from "../constants";
import { Button } from "./Button";

interface IFormProps {
  text: string;
}

interface IReviewFormProps {
  submitLoading: boolean;
  onSubmit: () => Promise<void>;
}

export const ReviewForm: React.FC<IReviewFormProps> = ({
  submitLoading,
  onSubmit,
}) => {
  const {
    handleSubmit,
    errors,
    watch,
    register,
    formState,
  } = useFormContext<IFormProps>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end mb-1">
        <span
          className={`text-sm ${
            errors.text?.type === "maxLength" ? "text-red-500" : "text-gray-600"
          }`}
        >{`(${watch().text?.length}/${REVIEW_MAX_LENGTH})`}</span>
      </div>
      <textarea
        className="review-textarea"
        ref={register({ required: true, maxLength: REVIEW_MAX_LENGTH })}
        name="text"
      />
      <div className="flex justify-end">
        <Button
          disabled={!formState.isValid || submitLoading}
          loading={submitLoading}
          text="Submit"
        />
      </div>
    </form>
  );
};
