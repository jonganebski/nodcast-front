/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getFeedQuery
// ====================================================

export interface getFeedQuery_getFeed_episodes_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
}

export interface getFeedQuery_getFeed_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  podcast: getFeedQuery_getFeed_episodes_podcast;
}

export interface getFeedQuery_getFeed {
  __typename: "GetFeedOutput";
  ok: boolean;
  err: string | null;
  episodes: getFeedQuery_getFeed_episodes[] | null;
}

export interface getFeedQuery {
  getFeed: getFeedQuery_getFeed;
}
