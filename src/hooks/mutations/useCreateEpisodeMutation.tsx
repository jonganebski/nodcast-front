import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo";
import { EPISODE_FRAGMENT } from "../../fragments";
import {
  createEpisodeMutation,
  createEpisodeMutationVariables,
} from "../../__generated__/createEpisodeMutation";
import {
  getEpisodesQuery,
  getEpisodesQuery_getEpisodes_episodes,
} from "../../__generated__/getEpisodesQuery";
import { GET_EPISODES_QUERY } from "../queries/useGetEpisodesQuery";

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutation($input: CreateEpisodeInput!) {
    createEpisode(input: $input) {
      ok
      err
      episode {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

export const useCreateEpisodeMutation = (resetDrawer: () => void) => {
  const onCompleted = (data: createEpisodeMutation) => {
    const {
      createEpisode: { ok, err, episode },
    } = data;
    if (ok && episode) {
      const prevQuery = client.readQuery<getEpisodesQuery>({
        query: GET_EPISODES_QUERY,
      });
      if (prevQuery) {
        const newEpisode: getEpisodesQuery_getEpisodes_episodes = {
          ...episode,
        };
        client.writeQuery<getEpisodesQuery>({
          query: GET_EPISODES_QUERY,
          data: {
            getEpisodes: {
              ...prevQuery.getEpisodes,
              episodes: prevQuery.getEpisodes.episodes
                ? [newEpisode, ...prevQuery.getEpisodes.episodes]
                : [newEpisode],
            },
          },
        });
        resetDrawer();
      }
    } else {
      console.log(err);
    }
  };

  return useMutation<createEpisodeMutation, createEpisodeMutationVariables>(
    CREATE_EPISODE_MUTATION,
    { onCompleted }
  );
};
