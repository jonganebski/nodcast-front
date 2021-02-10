/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SaveRatingInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: saveRatingMutation
// ====================================================

export interface saveRatingMutation_saveRating {
  __typename: "SaveRatingOutput";
  ok: boolean;
  err: string | null;
}

export interface saveRatingMutation {
  saveRating: saveRatingMutation_saveRating;
}

export interface saveRatingMutationVariables {
  input: SaveRatingInput;
}
