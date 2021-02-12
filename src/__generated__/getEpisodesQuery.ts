/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getEpisodesQuery
// ====================================================

export interface getEpisodesQuery_getEpisodes_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  coverUrl: string | null;
}

export interface getEpisodesQuery_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  audioUrl: string;
  dutationSeconds: number;
}

export interface getEpisodesQuery_getEpisodes {
  __typename: "GetEpisodesOutput";
  ok: boolean;
  err: string | null;
  podcast: getEpisodesQuery_getEpisodes_podcast | null;
  episodes: getEpisodesQuery_getEpisodes_episodes[] | null;
}

export interface getEpisodesQuery {
  getEpisodes: getEpisodesQuery_getEpisodes;
}
