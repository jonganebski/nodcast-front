import { gql, useMutation } from "@apollo/client";
import { client } from "../../apollo";
import { EPISODE_FRAGMENT } from "../../fragments";
import {
  editEpisodeMutation,
  editEpisodeMutationVariables,
  editEpisodeMutation_editEpisode_episode,
} from "../../__generated__/editEpisodeMutation";

const EDIT_EPISODE_MUTATION = gql`
  mutation editEpisodeMutation($input: EditEpisodeInput!) {
    editEpisode(input: $input) {
      ok
      err
      episode {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

export const useEditRpisodeMutation = (resetDrawer: () => void) => {
  const onCompleted = (data: editEpisodeMutation) => {
    const {
      editEpisode: { ok, err, episode },
    } = data;
    if (ok && episode) {
      client.writeFragment<editEpisodeMutation_editEpisode_episode>({
        id: `Episode:${episode.id}`,
        fragment: EPISODE_FRAGMENT,
        data: { ...episode },
      });
      resetDrawer();
    } else {
      console.log(err);
    }
  };
  return useMutation<editEpisodeMutation, editEpisodeMutationVariables>(
    EDIT_EPISODE_MUTATION,
    { onCompleted }
  );
};
