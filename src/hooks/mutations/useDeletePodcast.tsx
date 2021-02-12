import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { client } from "../../apollo";
import {
  deletePodcastMutation,
  deletePodcastMutationVariables,
} from "../../__generated__/deletePodcastMutation";

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcastMutation($input: DeletePodcastInput!) {
    deletePodcast(input: $input) {
      ok
      err
      id
    }
  }
`;

export const useDeletePodcastMutation = () => {
  const history = useHistory();
  const onCompleted = (data: deletePodcastMutation) => {
    const {
      deletePodcast: { ok, err, id },
    } = data;
    if (ok) {
      client.cache.evict({ id: `Podcast:${id}` });
      history.replace("/");
    } else {
      console.log(err);
    }
  };
  return useMutation<deletePodcastMutation, deletePodcastMutationVariables>(
    DELETE_PODCAST_MUTATION,
    { onCompleted }
  );
};
