/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastQuery
// ====================================================

export interface getPodcastQuery_getPodcast_myRating {
  __typename: "Rating";
  rating: number;
}

export interface getPodcastQuery_getPodcast_podcast_creator {
  __typename: "Users";
  username: string | null;
}

export interface getPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
}

export interface getPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string;
  rating: number | null;
  subscribersCount: number;
  creator: getPodcastQuery_getPodcast_podcast_creator;
  episodes: getPodcastQuery_getPodcast_podcast_episodes[];
}

export interface getPodcastQuery_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  err: string | null;
  currentPage: number | null;
  totalPages: number | null;
  myRating: getPodcastQuery_getPodcast_myRating | null;
  podcast: getPodcastQuery_getPodcast_podcast | null;
}

export interface getPodcastQuery {
  getPodcast: getPodcastQuery_getPodcast;
}

export interface getPodcastQueryVariables {
  input: GetPodcastInput;
}
