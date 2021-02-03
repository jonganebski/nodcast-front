import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DEFAULT_COVER, LYNN_URL, NICO_URL } from "../constants";
import { computeTimelapse } from "../helpers";
import { getAllPodcastsQuery } from "../__generated__/getAllPodcastsQuery";

const GET_ALL_PODCASTS_QUERY = gql`
  query getAllPodcastsQuery {
    getAllPodcasts {
      error
      ok
      podcasts {
        id
        title
        category
        rating
        updatedAt
      }
    }
  }
`;

export const Home = () => {
  const { data, loading } = useQuery<getAllPodcastsQuery>(
    GET_ALL_PODCASTS_QUERY
  );
  const [categories, setCategories] = useState<string[]>(["", "", ""]);

  useEffect(() => {
    const categories = data?.getAllPodcasts.podcasts?.reduce((acc, value) => {
      acc.add(value.category);
      return acc;
    }, new Set<string>());
    if (categories) {
      setCategories(Array.from(categories));
    }
  }, [data?.getAllPodcasts.podcasts]);

  return (
    <main className="container grid gap-10">
      {categories.map((categoryName, i) => {
        return loading ? (
          <section className="animate-pulse" key={i}>
            <div className="w-16 h-4 bg-gray-200 rounded-full mb-2"></div>
            <ul className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4].map((_, i) => {
                return (
                  <li key={i}>
                    <div className="object-cover rounded-lg mb-2 w-full h-28 bg-gray-200"></div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-1"></div>
                    <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <section key={i}>
            <h3 className="text-lg mb-2">{categoryName}</h3>
            <ul className="grid grid-cols-5 gap-4">
              {data?.getAllPodcasts.podcasts
                ?.filter((podcast) => podcast.category === categoryName)
                .map((podcast) => {
                  return (
                    <li key={podcast.id}>
                      <Link to={`podcasts/${podcast.id}`}>
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
                })}
            </ul>
          </section>
        );
      })}
    </main>
  );
};
