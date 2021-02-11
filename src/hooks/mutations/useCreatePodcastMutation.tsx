import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo";
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
      id
    }
  }
`;

export const useCreatePodcastMutation = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { data: userData } = useMeQuery();

  const onCompleted = (data: createPodcastMutation) => {
    const {
      createPodcast: { ok, err, id },
    } = data;
    if (ok) {
      const prevQuery = client.readQuery<
        getPodcastQuery,
        getPodcastQueryVariables
      >({
        query: GET_PODCAST_QUERY,
        variables: { input: {} },
      });
      if (prevQuery && id && userData) {
        client.writeQuery<getPodcastQuery, getPodcastQueryVariables>({
          query: GET_PODCAST_QUERY,
          variables: { input: {} },
          data: {
            getPodcast: {
              ...prevQuery.getPodcast,
              podcast: {
                __typename: "Podcast",
                id,
                title,
                description,
                rating: null,
                subscribersCount: 0,
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
