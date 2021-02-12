import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  createPodcastMutation,
  createPodcastMutationVariables,
} from "../../__generated__/createPodcastMutation";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from "../../__generated__/getPodcastQuery";
import { GET_PODCAST_QUERY } from "../useGetPodcastQuery";
import { useMeQuery } from "../useMeQuery";

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutation($input: CreatePodcastInput!) {
    createPodcast(input: $input) {
      ok
      err
      podcast {
        ...PodcastParts
      }
      categories {
        id
        name
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const useCreatePodcastMutation = () => {
  const { data: userData } = useMeQuery();

  const onCompleted = (data: createPodcastMutation) => {
    const {
      createPodcast: { ok, err, podcast: created, categories },
    } = data;
    if (ok) {
      const prevQuery = client.readQuery<
        getPodcastQuery,
        getPodcastQueryVariables
      >({
        query: GET_PODCAST_QUERY,
        variables: { input: {} },
      });
      if (prevQuery && created && categories && userData) {
        client.writeQuery<getPodcastQuery, getPodcastQueryVariables>({
          query: GET_PODCAST_QUERY,
          variables: { input: {} },
          data: {
            getPodcast: {
              ...prevQuery.getPodcast,
              podcast: {
                ...created,
                categories,
                rating: null,
                episodes: [],
                subscribers: [],
                creator: {
                  __typename: "Users",
                  id: userData.me.id,
                  username: userData.me.username,
                },
              },
            },
          },
        });
      }
    } else {
      console.log(err);
    }
  };
  return useMutation<createPodcastMutation, createPodcastMutationVariables>(
    CREATE_PODCAST_MUTATION,
    { onCompleted }
  );
};
