/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSubscriptionsQuery
// ====================================================

export interface getSubscriptionsQuery_getSubscriptions_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  subscribersCount: number;
  description: string;
  updatedAt: any;
  coverUrl: string | null;
}

export interface getSubscriptionsQuery_getSubscriptions {
  __typename: "GetSubscriptionsOutput";
  ok: boolean;
  err: string | null;
  podcasts: getSubscriptionsQuery_getSubscriptions_podcasts[] | null;
}

export interface getSubscriptionsQuery {
  getSubscriptions: getSubscriptionsQuery_getSubscriptions;
}
