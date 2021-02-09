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
  password: string;
}

export interface CreateReviewInput {
  podcastId: number;
  text: string;
}

export interface GetPodcastInput {
  page?: number | null;
  podcastId: number;
}

export interface GetReviewsInput {
  page?: number | null;
  podcastId: number;
}

export interface LoginInput {
  email: string;
  password: string;
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
