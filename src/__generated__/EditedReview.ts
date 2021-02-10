/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EditedReview
// ====================================================

export interface EditedReview_creator {
  __typename: "Users";
  id: number;
  username: string;
}

export interface EditedReview {
  __typename: "Review";
  id: number;
  text: string;
  createdAt: any;
  updatedAt: any;
  creator: EditedReview_creator;
}
