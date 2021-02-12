/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPodcastMutation
// ====================================================

export interface createPodcastMutation_createPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  subscribersCount: number;
  description: string;
  updatedAt: any;
  coverUrl: string | null;
}

export interface createPodcastMutation_createPodcast_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface createPodcastMutation_createPodcast {
  __typename: "CreatePodcastOutput";
  ok: boolean;
  err: string | null;
  podcast: createPodcastMutation_createPodcast_podcast | null;
  categories: createPodcastMutation_createPodcast_categories[] | null;
}

export interface createPodcastMutation {
  createPodcast: createPodcastMutation_createPodcast;
}

export interface createPodcastMutationVariables {
  input: CreatePodcastInput;
}
