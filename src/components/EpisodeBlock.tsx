import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import { computeTimelapse } from "../helpers";
import { getFeedQuery_getFeed_episodes } from "../__generated__/getFeedQuery";
import { getPodcastQuery_getPodcast_podcast_episodes } from "../__generated__/getPodcastQuery";
import { Button } from "./Button";
import { PodcastCover } from "./PodcastCover";

interface IEpisodeBlockProps {
  episode: Partial<
    getPodcastQuery_getPodcast_podcast_episodes & getFeedQuery_getFeed_episodes
  >;
}

export const EpisodeBlock: React.FC<IEpisodeBlockProps> = ({ episode }) => {
  return (
    <li className="bg-white py-5 flex">
      {episode.podcast && (
        <Link to={`/podcasts/${episode.podcast.id}`} className="mr-5">
          <PodcastCover coverUrl="" title={episode.podcast.title} />
        </Link>
      )}
      <div>
        {episode.podcast && (
          <h3 className="text-gray-800">{episode.podcast.title}</h3>
        )}
        <span className="text-xs text-gray-500">
          {computeTimelapse(episode.createdAt)}
        </span>
        <h4 className="text-md text-gray-800 font-semibold mb-2 cursor-pointer hover:underline">
          <Link to={`/episodes/${episode.id}`}>{episode.title}</Link>
        </h4>
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
        <Button text="4hr 21min" icon={faPlayCircle} />
      </div>
    </li>
  );
};
