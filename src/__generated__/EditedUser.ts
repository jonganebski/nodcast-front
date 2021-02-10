/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: EditedUser
// ====================================================

export interface EditedUser_subscriptions {
  __typename: "Podcast";
  id: number;
}

export interface EditedUser {
  __typename: "Users";
  id: number;
  email: string;
  username: string;
  role: UserRole;
  subscriptions: EditedUser_subscriptions[];
}
