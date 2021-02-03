import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { DEFAULT_COVER, LYNN_URL, NICO_URL } from "../constants";
import { computeTimelapse } from "../helpers";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
} from "../__generated__/getPodcastQuery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSortAmountDown,
  faSortAmountDownAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faPlayCircle } from "@fortawesome/free-regular-svg-icons";

const GET_PODCAST_QUERY = gql`
  query getPodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      ok
      error
      podcast {
        id
        title
        category
        creator {
          email
        }
        episodes {
          id
          title
          createdAt
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

  return (
    <main className="container">
      <section className="flex justify-between mb-4">
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
            ? [1, 2, 3, 4, 5].map((_, i) => (
                <li className="py-5 bg-white" key={i}>
                  <div className="animate-pulse w-2/6 bg-gray-200 h-2 rounded-full mb-3"></div>
                  <div className="animate-pulse w-5/6 bg-gray-200 h-2 rounded-full mb-4"></div>
                  <div className="animate-pulse w-24 h-4 bg-gray-200 rounded-full"></div>
                </li>
              ))
            : data?.getPodcast.podcast?.episodes
                .slice()
                .sort((a, b) => {
                  if (order === "descending") {
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  }
                  if (order === "ascending") {
                    return (
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime()
                    );
                  }
                  return 0;
                })
                .map((episode) => {
                  return (
                    <li className="bg-white py-5" key={episode.id}>
                      <span className="text-xs text-gray-500">
                        {computeTimelapse(episode.createdAt)}
                      </span>
                      <h4 className="text-sm font-semibold mb-4">
                        {episode.title}
                      </h4>
                      <button className="py-1 px-2 border rounded-full flex items-center hover:bg-gray-50 active:bg-gray-200 focus:outline-none">
                        <FontAwesomeIcon
                          className="text-lg text-blue-500 mr-2"
                          icon={faPlayCircle}
                        />
                        <span className="text-sm">4hr 21min</span>
                      </button>
                    </li>
                  );
                })}
        </ul>
      </section>
    </main>
  );
};
