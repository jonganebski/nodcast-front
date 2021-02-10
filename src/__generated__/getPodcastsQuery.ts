/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPodcastsQuery
// ====================================================

export interface getPodcastsQuery_getPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  subscribersCount: number;
  description: string;
  updatedAt: any;
  rating: number | null;
}

export interface getPodcastsQuery_getPodcasts {
  __typename: "GetPodcastsOutput";
  ok: boolean;
  err: string | null;
  podcasts: getPodcastsQuery_getPodcasts_podcasts[] | null;
}

export interface getPodcastsQuery {
  getPodcasts: getPodcastsQuery_getPodcasts;
}
