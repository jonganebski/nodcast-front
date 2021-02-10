/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  role: UserRole;
  email: string;
  username: string;
  password: string;
}

export interface CreatePodcastInput {
  title: string;
  description?: string | null;
  categoryIds?: number[] | null;
}

export interface CreateReviewInput {
  podcastId: number;
  text: string;
}

export interface EditProfileInput {
  email: string;
  username: string;
  password?: string | null;
}

export interface EditReviewInput {
  reviewId: number;
  text: string;
}

export interface GetEpisodeInput {
  episodeId: number;
}

export interface GetPodcastInput {
  page?: number | null;
  podcastId?: number | null;
}

export interface GetReviewsInput {
  page?: number | null;
  podcastId: number;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SaveRatingInput {
  podcastId: number;
  rating: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  titleQuery: string;
}

export interface ToggleSubscribeInput {
  podcastId: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
