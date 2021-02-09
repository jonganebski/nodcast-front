import { gql, useLazyQuery } from "@apollo/client";
import {
  searchPodcastsQuery,
  searchPodcastsQueryVariables,
} from "../__generated__/searchPodcastsQuery";

export const SEARCH_PODCASTS_QUERY = gql`
  query searchPodcastsQuery($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      err
      podcasts {
        id
        title
        rating
        updatedAt
      }
    }
  }
`;

export const useSearchPodcastsQuery = () => {
  return useLazyQuery<searchPodcastsQuery, searchPodcastsQueryVariables>(
    SEARCH_PODCASTS_QUERY
  );
};
