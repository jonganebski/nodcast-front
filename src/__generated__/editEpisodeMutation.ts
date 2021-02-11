/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editEpisodeMutation
// ====================================================

export interface editEpisodeMutation_editEpisode_episode {
  __typename: "Episode";
  id: number;
  title: string;
  createdAt: any;
  description: string;
  audioUrl: string;
  dutationSeconds: number;
}

export interface editEpisodeMutation_editEpisode {
  __typename: "EditEpisodeOutput";
  ok: boolean;
  err: string | null;
  episode: editEpisodeMutation_editEpisode_episode | null;
}

export interface editEpisodeMutation {
  editEpisode: editEpisodeMutation_editEpisode;
}

export interface editEpisodeMutationVariables {
  input: EditEpisodeInput;
}
