/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReviewInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createReviewMutation
// ====================================================

export interface createReviewMutation_createReview {
  __typename: "CreateReviewOutput";
  ok: boolean;
  err: string | null;
  id: number | null;
}

export interface createReviewMutation {
  createReview: createReviewMutation_createReview;
}

export interface createReviewMutationVariables {
  input: CreateReviewInput;
}
