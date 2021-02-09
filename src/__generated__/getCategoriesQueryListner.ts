/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getCategoriesQueryListner
// ====================================================

export interface getCategoriesQueryListner_getCategories_categories_podcasts {
  __typename: "Podcast";
  id: number;
  title: string;
  subscribersCount: number;
  description: string;
  updatedAt: any;
}

export interface getCategoriesQueryListner_getCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  podcasts: getCategoriesQueryListner_getCategories_categories_podcasts[];
}

export interface getCategoriesQueryListner_getCategories {
  __typename: "GetCategoriesOutput";
  ok: boolean;
  err: string | null;
  categories: getCategoriesQueryListner_getCategories_categories[] | null;
}

export interface getCategoriesQueryListner {
  getCategories: getCategoriesQueryListner_getCategories;
}
