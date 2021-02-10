import { gql, useMutation } from "@apollo/client";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { client } from "../apollo";
import { MAX_RATING } from "../constants";
import { GET_PODCAST_QUERY } from "../hooks/useGetPodcastQuery";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
  getPodcastQuery_getPodcast_podcast,
} from "../__generated__/getPodcastQuery";
import {
  saveRatingMutation,
  saveRatingMutationVariables,
} from "../__generated__/saveRatingMutation";

const SAVE_RATING_MUTATION = gql`
  mutation saveRatingMutation($input: SaveRatingInput!) {
    saveRating(input: $input) {
      ok
      err
    }
  }
`;

interface IRatingStarsProps {
  rating: number;
  isEditMode?: boolean;
  podcast?: getPodcastQuery_getPodcast_podcast | null;
}

export const RatingStars: React.FC<IRatingStarsProps> = ({
  rating: initialRating,
  isEditMode = false,
  podcast,
}) => {
  const [rating, setRating] = useState(initialRating);

  const onCompleted = (data: saveRatingMutation) => {
    const {
      saveRating: { ok, err },
    } = data;
    if (ok && podcast) {
      const prevQuery = client.readQuery<
        getPodcastQuery,
        getPodcastQueryVariables
      >({
        query: GET_PODCAST_QUERY,
        variables: { input: { podcastId: podcast.id } },
      });
      if (prevQuery) {
        client.writeQuery<getPodcastQuery, getPodcastQueryVariables>({
          query: GET_PODCAST_QUERY,
          variables: { input: { podcastId: podcast.id } },
          data: {
            getPodcast: {
              ...prevQuery.getPodcast,
              myRating: { __typename: "Rating", rating },
            },
          },
        });
      }
    } else {
      console.log(err);
    }
  };

  const [saveRatingMutation] = useMutation<
    saveRatingMutation,
    saveRatingMutationVariables
  >(SAVE_RATING_MUTATION, { onCompleted });
  return (
    <div
      className="flex items-center cursor-pointer"
      onMouseLeave={() => {
        setRating(initialRating);
      }}
      onClick={() => {
        if (podcast?.id) {
          saveRatingMutation({
            variables: { input: { podcastId: podcast.id, rating } },
          });
        }
      }}
    >
      {Array.from(Array(MAX_RATING).keys(), (key) => key + 1).map((num) => {
        return 0.5 <= num - rating && num - rating < 1 ? (
          <div
            className="relative flex items-center"
            style={{ zIndex: -1 }}
            key={num}
          >
            <FontAwesomeIcon
              className="absolute top-0 left-0 text-gray-300 text-xs cursor-pointer"
              onMouseEnter={() => {
                if (isEditMode) {
                  setRating(num);
                }
              }}
              icon={faStar}
            />
            <FontAwesomeIcon
              className="relative text-yellow-400 text-xs cursor-pointer"
              onMouseEnter={() => {
                if (isEditMode) {
                  setRating(num);
                }
              }}
              icon={faStarHalf}
            />
          </div>
        ) : (
          <FontAwesomeIcon
            className={`${
              num <= rating ? "text-yellow-400" : "text-gray-300"
            } text-xs cursor-pointer`}
            onMouseEnter={() => {
              if (isEditMode) {
                setRating(num);
              }
            }}
            icon={faStar}
            key={num}
          />
        );
      })}
    </div>
  );
};
