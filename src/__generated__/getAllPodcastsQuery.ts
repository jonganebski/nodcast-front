/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Categories } from "./globalTypes";

// ====================================================
// GraphQL query operation: getAllPodcastsQuery
// ====================================================

export interface getAllPodcastsQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: Categories;
  rating: number;
  updatedAt: any;
}

export interface getAllPodcastsQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  error: string | null;
  ok: boolean;
  podcasts: getAllPodcastsQuery_getAllPodcasts_podcasts[] | null;
}

export interface getAllPodcastsQuery {
  getAllPodcasts: getAllPodcastsQuery_getAllPodcasts;
}
