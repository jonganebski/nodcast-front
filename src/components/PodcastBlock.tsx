import React from "react";
import { Link } from "react-router-dom";
import { computeTimelapse } from "../helpers";
import { getCategoriesQueryListner_getCategories_categories_podcasts } from "../__generated__/getCategoriesQueryListner";
import { PodcastCover } from "./PodcastCover";

interface IPodcastBlock {
  podcast: getCategoriesQueryListner_getCategories_categories_podcasts;
  index: number;
}

const src = "";

export const PodcastBlock: React.FC<IPodcastBlock> = ({ podcast, index }) => {
  return (
    <li className="w-28">
      <Link to={`/podcasts/${podcast.id}`}>
        <PodcastCover coverUrl={src} title={podcast.title} />
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
