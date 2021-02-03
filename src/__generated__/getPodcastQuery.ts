/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastQuery
// ====================================================

export interface getPodcastQuery_getPodcast_podcast_creator {
  __typename: "User";
  email: string;
}

export interface getPodcastQuery_getPodcast_podcast_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
}

export interface getPodcastQuery_getPodcast_podcast_reviews {
  __typename: "Review";
  title: string;
  text: string;
}

export interface getPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  title: string;
  category: string;
  creator: getPodcastQuery_getPodcast_podcast_creator;
  episodes: getPodcastQuery_getPodcast_podcast_episodes[];
  reviews: getPodcastQuery_getPodcast_podcast_reviews[];
}

export interface getPodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  ok: boolean;
  error: string | null;
  podcast: getPodcastQuery_getPodcast_podcast | null;
}

export interface getPodcastQuery {
  getPodcast: getPodcastQuery_getPodcast;
}

export interface getPodcastQueryVariables {
  input: PodcastSearchInput;
}
