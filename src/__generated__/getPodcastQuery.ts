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

export interface getPodcastQuery_getPodcast_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface getPodcastQuery_getPodcast_podcast_creator {
  __typename: "Users";
  id: number;
  username: string;
}

export interface getPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  audioUrl: string;
  dutationSeconds: number;
}

export interface getPodcastQuery_getPodcast_podcast_subscribers {
  __typename: "Users";
  id: number;
  username: string;
}

export interface getPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string;
  rating: number | null;
  subscribersCount: number;
  creator: getPodcastQuery_getPodcast_podcast_creator | null;
  episodes: getPodcastQuery_getPodcast_podcast_episodes[];
  subscribers: getPodcastQuery_getPodcast_podcast_subscribers[];
}

export interface getPodcastQuery_getPodcast {
  __typename: "GetPodcastOutput";
  ok: boolean;
  err: string | null;
  currentPage: number | null;
  totalPages: number | null;
  myRating: getPodcastQuery_getPodcast_myRating | null;
  categories: getPodcastQuery_getPodcast_categories[] | null;
  podcast: getPodcastQuery_getPodcast_podcast | null;
}

export interface getPodcastQuery {
  getPodcast: getPodcastQuery_getPodcast;
}

export interface getPodcastQueryVariables {
  input: GetPodcastInput;
}
