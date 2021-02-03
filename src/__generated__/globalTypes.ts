/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Categories {
  Arts = "Arts",
  Business = "Business",
  Comedy = "Comedy",
  Education = "Education",
  Flex = "Flex",
  Health = "Health",
  NewsAndPolitics = "NewsAndPolitics",
  SocietyAndCulture = "SocietyAndCulture",
  SportsAndRecreation = "SportsAndRecreation",
  TVAndFilm = "TVAndFilm",
  Technology = "Technology",
}

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastSearchInput {
  id: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  titleQuery: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
