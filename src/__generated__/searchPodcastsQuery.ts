/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput, Categories } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcastsQuery
// ====================================================

export interface searchPodcastsQuery_searchPodcasts_podcasts_creator {
  __typename: "User";
  email: string;
}

export interface searchPodcastsQuery_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  category: Categories;
  rating: number;
  updatedAt: any;
  creator: searchPodcastsQuery_searchPodcasts_podcasts_creator;
}

export interface searchPodcastsQuery_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcastsQuery_searchPodcasts_podcasts[] | null;
}

export interface searchPodcastsQuery {
  searchPodcasts: searchPodcastsQuery_searchPodcasts;
}

export interface searchPodcastsQueryVariables {
  input: SearchPodcastsInput;
}
