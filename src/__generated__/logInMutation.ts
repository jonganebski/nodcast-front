/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: logInMutation
// ====================================================

export interface logInMutation_login {
  __typename: "LoginOutput";
  ok: boolean;
  err: string | null;
  token: string | null;
}

export interface logInMutation {
  login: logInMutation_login;
}

export interface logInMutationVariables {
  input: LoginInput;
}
