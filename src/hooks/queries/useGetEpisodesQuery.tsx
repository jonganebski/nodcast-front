import { gql, useQuery } from "@apollo/client";
import { EPISODE_FRAGMENT } from "../../fragments";
import { getEpisodesQuery } from "../../__generated__/getEpisodesQuery";

export const GET_EPISODES_QUERY = gql`
  query getEpisodesQuery {
    getEpisodes {
      ok
      err
      podcast {
        id
        title
        coverUrl
      }
      episodes {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

export const useGetEpisodesQuery = () => {
  return useQuery<getEpisodesQuery>(GET_EPISODES_QUERY);
};
