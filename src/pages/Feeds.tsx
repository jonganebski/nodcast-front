import { gql, useQuery } from "@apollo/client";
import React from "react";
import { EpisodeBlock } from "../components/EpisodeBlock";
import { EpisodeBlockSkeleton } from "../components/EpisodeBlockSkeleton";
import { EPISODE_FRAGMENT } from "../fragments";
import { getFeedQuery } from "../__generated__/getFeedQuery";

const GET_FEED_QUERY = gql`
  query getFeedQuery {
    getFeed {
      ok
      err
      episodes {
        ...EpisodeParts
        podcast {
          id
          title
        }
      }
    }
  }
  ${EPISODE_FRAGMENT}
`;

export const Feeds = () => {
  const { data, loading } = useQuery<getFeedQuery>(GET_FEED_QUERY);

  return (
    <main className="container">
      <h2 className="text-lg">Latest feeds ⚡</h2>
      <ul className="grid gap-px bg-gray-200">
        {loading
          ? Array(5)
              .fill("")
              .map((_, i) => {
                return (
                  <EpisodeBlockSkeleton isPodcastDataIncluded={true} key={i} />
                );
              })
          : data?.getFeed.episodes?.map((episode) => {
              return <EpisodeBlock episode={episode} key={episode.id} />;
            })}
      </ul>
    </main>
  );
};
