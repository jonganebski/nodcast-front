import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { computeTimelapse } from "../helpers";
import { getPodcastQuery_getPodcast_podcast_episodes } from "../__generated__/getPodcastQuery";

interface IEpisodeBlockProps {
  episode: getPodcastQuery_getPodcast_podcast_episodes;
}

export const EpisodeBlock: React.FC<IEpisodeBlockProps> = ({ episode }) => {
  return (
    <li className="bg-white py-5">
      <span className="text-xs text-gray-500">
        {computeTimelapse(episode.createdAt)}
      </span>
      <h4 className="text-sm font-semibold mb-2">{episode.title}</h4>
      <p
        className="mb-4 text-sm text-gray-600 overflow-ellipsis overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {episode.description}
      </p>
      <button className="py-1 px-2 border rounded-full flex items-center hover:bg-gray-50 active:bg-gray-200 focus:outline-none">
        <FontAwesomeIcon
          className="text-lg text-blue-500 mr-2"
          icon={faPlayCircle}
        />
        <span className="text-sm">4hr 21min</span>
      </button>
    </li>
  );
};
