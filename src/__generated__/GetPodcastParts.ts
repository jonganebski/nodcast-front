/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GetPodcastParts
// ====================================================

export interface GetPodcastParts_creator {
  __typename: "Users";
  id: number;
  username: string;
}

export interface GetPodcastParts_episodes {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  audioUrl: string;
  dutationSeconds: number;
}

export interface GetPodcastParts_subscribers {
  __typename: "Users";
  id: number;
  username: string;
}

export interface GetPodcastParts_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface GetPodcastParts {
  __typename: "Podcast";
  id: number;
  title: string;
  description: string;
  rating: number | null;
  subscribersCount: number;
  coverUrl: string | null;
  creator: GetPodcastParts_creator | null;
  episodes: GetPodcastParts_episodes[];
  subscribers: GetPodcastParts_subscribers[];
  categories: GetPodcastParts_categories[];
}
