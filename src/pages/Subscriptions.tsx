import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { PodcastBlock } from "../components/PodcastBlock";
import { PodcastBlockSkeleton } from "../components/PodcastBlockSkeleton";
import { PODCAST_FRAGMENT } from "../fragments";
import { useMeQuery } from "../hooks/useMeQuery";
import { getSubscriptionsQuery } from "../__generated__/getSubscriptionsQuery";

const GET_SUBSCRIPTIONS_QUERY = gql`
  query getSubscriptionsQuery {
    getSubscriptions {
      ok
      err
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Subscriptions = () => {
  const { data: userData } = useMeQuery();
  const { data, loading } = useQuery<getSubscriptionsQuery>(
    GET_SUBSCRIPTIONS_QUERY
  );

  return (
    <main className="container">
      <Helmet>
        <title>Subscriptions | Nodcast</title>
      </Helmet>
      <h2 className="mb-6 text-lg">
        {userData?.me.username}'s subscriptions ❤
      </h2>
      <ul className="grid grid-cols-5 gap-y-5">
        {loading
          ? Array(userData?.me.subscriptions.length ?? 5)
              .fill("")
              .map((_, i) => <PodcastBlockSkeleton key={i} />)
          : data?.getSubscriptions.podcasts
              ?.slice()
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
              )
              .map((podcast, i) => {
                return <PodcastBlock podcast={podcast} key={podcast.id} />;
              })}
      </ul>
    </main>
  );
};
