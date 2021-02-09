import { gql, useLazyQuery } from "@apollo/client";
import { client } from "../apollo";
import {
  getReviewsQuery,
  getReviewsQueryVariables,
} from "../__generated__/getReviewsQuery";

export const GET_REVIEWS_QUERY = gql`
  query getReviewsQuery($input: GetReviewsInput!) {
    getReviews(input: $input) {
      ok
      err
      currentPage
      totalPages
      reviews {
        id
        text
        creator {
          username
          ratings {
            rating
          }
        }
      }
    }
  }
`;

export const useGetReviewsLazyQuery = (podcastId: number) => {
  const onCompleted = (data: getReviewsQuery) => {
    const {
      getReviews: { ok, reviews, err, currentPage },
    } = data;
    if (ok && reviews) {
      client.writeQuery<getReviewsQuery, getReviewsQueryVariables>({
        query: GET_REVIEWS_QUERY,
        data,
        variables: { input: { podcastId } },
      });
    } else {
      console.log(err);
    }
  };

  return useLazyQuery<getReviewsQuery, getReviewsQueryVariables>(
    GET_REVIEWS_QUERY,
    { onCompleted }
  );
};
