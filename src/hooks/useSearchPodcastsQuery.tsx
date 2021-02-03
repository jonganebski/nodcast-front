import { gql, useLazyQuery } from "@apollo/client";
import {
  searchPodcastsQuery,
  searchPodcastsQueryVariables,
} from "../__generated__/searchPodcastsQuery";

export const SEARCH_PODCASTS_QUERY = gql`
  query searchPodcastsQuery($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
      podcasts {
        id
        title
        category
        rating
        updatedAt
        creator {
          email
        }
      }
    }
  }
`;

export const useSearchPodcastsQuery = () => {
  return useLazyQuery<searchPodcastsQuery, searchPodcastsQueryVariables>(
    SEARCH_PODCASTS_QUERY
  );
};
