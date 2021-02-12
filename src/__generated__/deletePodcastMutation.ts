/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeletePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deletePodcastMutation
// ====================================================

export interface deletePodcastMutation_deletePodcast {
  __typename: "DeletePodcastOutput";
  ok: boolean;
  err: string | null;
  id: number | null;
}

export interface deletePodcastMutation {
  deletePodcast: deletePodcastMutation_deletePodcast;
}

export interface deletePodcastMutationVariables {
  input: DeletePodcastInput;
}
