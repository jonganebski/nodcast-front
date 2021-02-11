/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEpisodeMutation
// ====================================================

export interface deleteEpisodeMutation_deleteEpisode {
  __typename: "DeleteEpisodeOutput";
  ok: boolean;
  err: string | null;
  id: number | null;
}

export interface deleteEpisodeMutation {
  deleteEpisode: deleteEpisodeMutation_deleteEpisode;
}

export interface deleteEpisodeMutationVariables {
  input: DeleteEpisodeInput;
}
