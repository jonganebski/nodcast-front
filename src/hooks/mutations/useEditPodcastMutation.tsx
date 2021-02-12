import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo";
import { PODCAST_FRAGMENT } from "../../fragments";
import {
  editPodcastMutation,
  editPodcastMutationVariables,
} from "../../__generated__/editPodcastMutation";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
  getPodcastQuery_getPodcast,
} from "../../__generated__/getPodcastQuery";
import { GET_PODCAST_QUERY } from "../useGetPodcastQuery";

const EDIT_PODCAST_MUTATION = gql`
  mutation editPodcastMutation($input: EditPodcastInput!) {
    editPodcast(input: $input) {
      ok
      err
      editedPodcast {
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

export const useEditPodcastMutation = (
  prevQuery: getPodcastQuery_getPodcast | undefined
) => {
  const onCompleted = (data: editPodcastMutation) => {
    const {
      editPodcast: { ok, err, editedPodcast, categories },
    } = data;
    if (ok && editedPodcast && categories) {
      if (prevQuery?.podcast) {
        client.writeQuery<getPodcastQuery, getPodcastQueryVariables>({
          query: GET_PODCAST_QUERY,
          variables: { input: {} },
          data: {
            getPodcast: {
              ...prevQuery,
              podcast: { ...prevQuery.podcast, ...editedPodcast, categories },
            },
          },
        });
      }
    } else {
      console.log(err);
    }
  };
  return useMutation<editPodcastMutation, editPodcastMutationVariables>(
    EDIT_PODCAST_MUTATION,
    { onCompleted }
  );
};
