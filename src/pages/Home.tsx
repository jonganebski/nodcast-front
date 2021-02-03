import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PodcastBlock } from "../components/PodcastBlock";
import { PodcastBlockSkeleton } from "../components/PodcastBlockSkeleton";
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
      <Helmet>
        <title>Home | Nodcast</title>
      </Helmet>
      {categories.map((categoryName, i) => {
        return loading ? (
          <section className="animate-pulse" key={i}>
            <div className="w-16 h-4 bg-gray-200 rounded-full mb-2"></div>
            <ul className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4].map((_, i) => {
                return <PodcastBlockSkeleton key={i} />;
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
                  return <PodcastBlock podcast={podcast} key={podcast.id} />;
                })}
            </ul>
          </section>
        );
      })}
    </main>
  );
};
