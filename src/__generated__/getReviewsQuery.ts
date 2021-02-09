/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetReviewsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getReviewsQuery
// ====================================================

export interface getReviewsQuery_getReviews_reviews_creator_ratings {
  __typename: "Rating";
  rating: number;
}

export interface getReviewsQuery_getReviews_reviews_creator {
  __typename: "Users";
  username: string | null;
  ratings: getReviewsQuery_getReviews_reviews_creator_ratings[];
}

export interface getReviewsQuery_getReviews_reviews {
  __typename: "Review";
  id: number;
  text: string;
  creator: getReviewsQuery_getReviews_reviews_creator;
}

export interface getReviewsQuery_getReviews {
  __typename: "GetReviewsOutput";
  ok: boolean;
  err: string | null;
  currentPage: number | null;
  totalPages: number | null;
  reviews: getReviewsQuery_getReviews_reviews[] | null;
}

export interface getReviewsQuery {
  getReviews: getReviewsQuery_getReviews;
}

export interface getReviewsQueryVariables {
  input: GetReviewsInput;
}
