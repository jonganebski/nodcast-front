import { gql, useQuery } from "@apollo/client";
import { GET_PODCAST_QUERY_FRAGMENT } from "../fragments";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from "../__generated__/getPodcastQuery";

export const GET_PODCAST_QUERY = gql`
  query getPodcastQuery($input: GetPodcastInput!) {
    getPodcast(input: $input) {
      ok
      err
      currentPage
      totalPages
      myRating {
        rating
      }
      categories {
        id
        name
      }
      podcast {
        ...GetPodcastParts
      }
    }
  }
  ${GET_PODCAST_QUERY_FRAGMENT}
`;

export const useGetPodcastQuery = (podcastId?: number) => {
  return useQuery<getPodcastQuery, getPodcastQueryVariables>(
    GET_PODCAST_QUERY,
    {
      variables: { input: { podcastId } },
    }
  );
};
