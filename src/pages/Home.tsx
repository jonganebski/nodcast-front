import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { CategorySection } from "../components/CategorySection";
import { PodcastBlockSkeleton } from "../components/PodcastBlockSkeleton";
import { PODCAST_FRAGMENT } from "../fragments";
import { getCategoriesQueryListner } from "../__generated__/getCategoriesQueryListner";

export const GET_CATEGORIES_QUERY_LISTENER = gql`
  query getCategoriesQueryListner {
    getCategories {
      ok
      err
      categories {
        id
        name
        podcasts {
          ...PodcastParts
        }
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Home = () => {
  const { data, loading } = useQuery<getCategoriesQueryListner>(
    GET_CATEGORIES_QUERY_LISTENER
  );
  console.log(loading);
  console.log(data);
  return (
    <main className="container grid gap-10">
      <Helmet>
        <title>Home | Nodcast</title>
      </Helmet>
      {loading
        ? Array(5)
            .fill(0)
            .map((_, i) => (
              <section className="animate-pulse" key={i}>
                <div className="w-16 h-4 bg-gray-200 rounded-full mb-2"></div>
                <ul className="grid grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5].map((_, i) => {
                    return <PodcastBlockSkeleton key={i} />;
                  })}
                </ul>
              </section>
            ))
        : data?.getCategories.categories?.map((category) => {
            if (category.podcasts.length !== 0) {
              return <CategorySection category={category} key={category.id} />;
            } else {
              return null;
            }
          })}
    </main>
  );
};
