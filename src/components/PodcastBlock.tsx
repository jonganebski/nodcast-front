import React from "react";
import { Link } from "react-router-dom";
import { NICO_URL, LYNN_URL, DEFAULT_COVER } from "../constants";
import { computeTimelapse } from "../helpers";
import { getAllPodcastsQuery_getAllPodcasts_podcasts } from "../__generated__/getAllPodcastsQuery";

interface IPodcastBlock {
  podcast: getAllPodcastsQuery_getAllPodcasts_podcasts;
}

export const PodcastBlock: React.FC<IPodcastBlock> = ({ podcast }) => {
  return (
    <li>
      <Link to={`/podcasts/${podcast.id}`}>
        <img
          className="object-cover rounded-lg mb-1 w-full h-28"
          src={
            podcast.id === 1
              ? NICO_URL
              : podcast.id === 3
              ? LYNN_URL
              : DEFAULT_COVER
          }
          alt="podcast-cover"
        />
        <h5
          className="text-sm overflow-ellipsis overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {podcast.title}
        </h5>
        <span className="text-xs text-gray-500">
          {computeTimelapse(podcast.updatedAt)}
        </span>
      </Link>
    </li>
  );
};
