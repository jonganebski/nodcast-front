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

export interface CreateEpisodeInput {
  title: string;
  audioUrl: string;
  dutationSeconds: number;
  description?: string | null;
}

export interface CreatePodcastInput {
  title: string;
  description?: string | null;
  categoryIds?: number[] | null;
  coverUrl?: string | null;
}

export interface CreateReviewInput {
  podcastId: number;
  text: string;
}

export interface DeleteEpisodeInput {
  episodeId: number;
}

export interface DeletePodcastInput {
  podcastId: number;
}

export interface EditEpisodeInput {
  episodeId: number;
  title: string;
  audioUrl: string;
  dutationSeconds: number;
  description?: string | null;
}

export interface EditPodcastInput {
  title: string;
  podcastId: number;
  description?: string | null;
  coverUrl?: string | null;
  categoryIds: number[];
}

export interface EditProfileInput {
  email: string;
  username: string;
  avatarUrl?: string | null;
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
