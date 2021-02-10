/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editReviewMutation
// ====================================================

export interface editReviewMutation_editReview {
  __typename: "EditReviewOutput";
  ok: boolean;
  err: string | null;
}

export interface editReviewMutation {
  editReview: editReviewMutation_editReview;
}

export interface editReviewMutationVariables {
  input: EditReviewInput;
}
