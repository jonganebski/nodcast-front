/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfileMutation
// ====================================================

export interface editProfileMutation_editProfile {
  __typename: "EditProfileOutput";
  ok: boolean;
  err: string | null;
  avatarUrl: string | null;
}

export interface editProfileMutation {
  editProfile: editProfileMutation_editProfile;
}

export interface editProfileMutationVariables {
  input: EditProfileInput;
}
