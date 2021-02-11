/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createEpisodeMutation
// ====================================================

export interface createEpisodeMutation_createEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  audioUrl: string;
  dutationSeconds: number;
}

export interface createEpisodeMutation_createEpisode {
  __typename: "CreateEpisodeOutput";
  ok: boolean;
  err: string | null;
  episode: createEpisodeMutation_createEpisode_episode | null;
}

export interface createEpisodeMutation {
  createEpisode: createEpisodeMutation_createEpisode;
}

export interface createEpisodeMutationVariables {
  input: CreateEpisodeInput;
}
