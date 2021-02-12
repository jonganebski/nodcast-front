/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewParts
// ====================================================

export interface ReviewParts_creator {
  __typename: "Users";
  id: number;
  username: string;
  avatarUrl: string | null;
}

export interface ReviewParts {
  __typename: "Review";
  id: number;
  text: string;
  createdAt: any;
  updatedAt: any;
  creator: ReviewParts_creator;
}
