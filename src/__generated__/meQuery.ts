/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me_subscriptions {
  __typename: "Podcast";
  id: number;
}

export interface meQuery_me {
  __typename: "Users";
  id: number;
  email: string;
  username: string | null;
  role: UserRole;
  subscriptions: meQuery_me_subscriptions[];
}

export interface meQuery {
  me: meQuery_me;
}
