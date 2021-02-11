/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getEpisodeQuery
// ====================================================

export interface getEpisodeQuery_getEpisode_episode_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface getEpisodeQuery_getEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  audioUrl: string;
  dutationSeconds: number;
  podcast: getEpisodeQuery_getEpisode_episode_podcast;
}

export interface getEpisodeQuery_getEpisode {
  __typename: "GetEpisodeOutput";
  ok: boolean;
  err: string | null;
  episode: getEpisodeQuery_getEpisode_episode | null;
}

export interface getEpisodeQuery {
  getEpisode: getEpisodeQuery_getEpisode;
}

export interface getEpisodeQueryVariables {
  input: GetEpisodeInput;
}
