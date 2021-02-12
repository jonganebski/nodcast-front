/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editPodcastMutation
// ====================================================

export interface editPodcastMutation_editPodcast_editedPodcast {
  __typename: "Podcast";
  id: number;
  title: string;
  subscribersCount: number;
  description: string;
  updatedAt: any;
  coverUrl: string | null;
}

export interface editPodcastMutation_editPodcast_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface editPodcastMutation_editPodcast {
  __typename: "EditPodcastOutput";
  ok: boolean;
  err: string | null;
  editedPodcast: editPodcastMutation_editPodcast_editedPodcast | null;
  categories: editPodcastMutation_editPodcast_categories[] | null;
}

export interface editPodcastMutation {
  editPodcast: editPodcastMutation_editPodcast;
}

export interface editPodcastMutationVariables {
  input: EditPodcastInput;
}
