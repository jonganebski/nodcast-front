import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo";
import {
  deleteEpisodeMutation,
  deleteEpisodeMutationVariables,
} from "../../__generated__/deleteEpisodeMutation";

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisodeMutation($input: DeleteEpisodeInput!) {
    deleteEpisode(input: $input) {
      ok
      err
      id
    }
  }
`;

export const useDeleteEpisodeMutation = () => {
  const onCompleted = (data: deleteEpisodeMutation) => {
    const {
      deleteEpisode: { ok, err, id },
    } = data;
    if (ok && id) {
      client.cache.evict({ id: `Episode:${id}` });
    } else {
      console.log(err);
    }
  };

  return useMutation<deleteEpisodeMutation, deleteEpisodeMutationVariables>(
    DELETE_EPISODE_MUTATION,
    { onCompleted }
  );
};
