/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: toggleSubscribeMutation
// ====================================================

export interface toggleSubscribeMutation_toggleSubscribe {
  __typename: "ToggleSubscribeOutput";
  ok: boolean;
  err: string | null;
}

export interface toggleSubscribeMutation {
  toggleSubscribe: toggleSubscribeMutation_toggleSubscribe;
}

export interface toggleSubscribeMutationVariables {
  input: ToggleSubscribeInput;
}
