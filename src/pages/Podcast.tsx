import { gql, useQuery } from "@apollo/client";
import {
  faPlus,
  faSortAmountDown,
  faSortAmountDownAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { EpisodeBlock } from "../components/EpisodeBlock";
import { EpisodeBlockSkeleton } from "../components/EpisodeBlockSkeleton";
import { DEFAULT_COVER, LYNN_URL, NICO_URL } from "../constants";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
  getPodcastQuery_getPodcast_podcast_episodes,
} from "../__generated__/getPodcastQuery";

export const GET_PODCAST_QUERY = gql`
  query getPodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        id
        title
        category
        description
        creator {
          email
        }
        episodes {
          id
          title
          createdAt
          description
        }
        reviews {
          title
          text
        }
      }
    }
  }
`;

interface IParams {
  podcastId: string;
}

export const Podcast = () => {
  const { podcastId } = useParams<IParams>();
  const [order, setOrder] = useState<"ascending" | "descending">("descending");
  const { data, loading } = useQuery<getPodcastQuery, getPodcastQueryVariables>(
    GET_PODCAST_QUERY,
    { variables: { input: { id: +podcastId } } }
  );

  const sortEpisodes = (
    a: getPodcastQuery_getPodcast_podcast_episodes,
    b: getPodcastQuery_getPodcast_podcast_episodes
  ) => {
    if (order === "descending") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (order === "ascending") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  };

  return (
    <main className="container">
      <Helmet>
        <title>Podcast | Nodcast</title>
      </Helmet>
      <section className="mb-4">
        <div className="flex justify-between mb-3">
          <div>
            {loading ? (
              <div className="animate-pulse w-48 h-3 bg-gray-200 rounded-full mb-2"></div>
            ) : (
              <h2 className="text-xl">{data?.getPodcast.podcast?.title}</h2>
            )}
            {loading ? (
              <div className="animate-pulse w-32 h-3 bg-gray-200 rounded-full mb-2"></div>
            ) : (
              <span className="text-gray-500 block mb-2">
                {data?.getPodcast.podcast?.creator.email.split("@")[0]}
              </span>
            )}
            <button className="border rounded-full py-1 px-3 text-sm hover:bg-gray-50 active:bg-gray-200 focus:outline-none">
              <FontAwesomeIcon className="mr-2 text-blue-500" icon={faPlus} />
              Subscribe
            </button>
          </div>
          {loading ? (
            <div className="animate-pulse bg-gray-200 rounded-lg mb-1 w-28 h-28"></div>
          ) : (
            <img
              className="object-cover rounded-lg mb-1 w-28 h-28"
              src={
                data?.getPodcast.podcast?.id === 1
                  ? NICO_URL
                  : data?.getPodcast.podcast?.id === 3
                  ? LYNN_URL
                  : DEFAULT_COVER
              }
              alt="podcast-cover"
            />
          )}
        </div>
        {loading ? (
          <div className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-2 mb-2"></div>
            <div className="bg-gray-200 rounded-lg h-2 mb-2"></div>
            <div className="bg-gray-200 rounded-lg h-2 w-3/5"></div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 w-4/5">
            {data?.getPodcast.podcast?.description}
          </p>
        )}
      </section>
      <section>
        <div className="flex justify-between">
          <h3>Available episodes</h3>
          <div
            className="cursor-pointer flex items-center"
            onClick={() => {
              setOrder((prev) =>
                prev === "descending" ? "ascending" : "descending"
              );
            }}
          >
            <span className="mr-2 text-sm">
              {order === "descending" ? "Newest first" : "Oldest first"}
            </span>
            <FontAwesomeIcon
              className="text-lg"
              icon={
                order === "descending" ? faSortAmountDown : faSortAmountDownAlt
              }
            />
          </div>
        </div>
        <ul className="grid gap-px bg-gray-300">
          {loading
            ? [1, 2, 3, 4, 5].map((_, i) => <EpisodeBlockSkeleton key={i} />)
            : data?.getPodcast.podcast?.episodes
                .slice()
                .sort(sortEpisodes)
                .map((episode) => {
                  return <EpisodeBlock episode={episode} key={episode.id} />;
                })}
        </ul>
      </section>
    </main>
  );
};
