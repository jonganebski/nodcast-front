import { gql, useMutation, useQuery } from "@apollo/client";
import {
  faCheck,
  faPenNib,
  faPlus,
  faSortAmountDown,
  faSortAmountDownAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { client } from "../apollo";
import { Button } from "../components/Button";
import { EpisodeBlock } from "../components/EpisodeBlock";
import { EpisodeBlockSkeleton } from "../components/EpisodeBlockSkeleton";
import { RatingStars } from "../components/RatingStars";
import { ReviewsDrawer } from "../components/ReviewsDrawer";
import { DEFAULT_COVER, LYNN_URL, NICO_URL } from "../constants";
import { useGetReviewsLazyQuery } from "../hooks/useGetReviewsQuery";
import { ME_QUERY, useMeQuery } from "../hooks/useMeQuery";
import {
  getPodcastQuery,
  getPodcastQueryVariables,
  getPodcastQuery_getPodcast_podcast_episodes,
} from "../__generated__/getPodcastQuery";
import { meQuery } from "../__generated__/meQuery";
import {
  toggleSubscribeMutation,
  toggleSubscribeMutationVariables,
} from "../__generated__/toggleSubscribeMutation";

export const TOGGLE_SUBSCRIBE_MUTATION = gql`
  mutation toggleSubscribeMutation($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      ok
      err
    }
  }
`;

export const GET_PODCAST_QUERY = gql`
  query getPodcastQuery($input: GetPodcastInput!) {
    getPodcast(input: $input) {
      ok
      err
      currentPage
      totalPages
      myRating {
        rating
      }
      podcast {
        id
        title
        description
        rating
        subscribersCount
        creator {
          username
        }
        episodes {
          id
          title
          createdAt
          description
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
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [isReviewsOpen, setIsReviewsOpen] = useState(true);
  const { data: userData } = useMeQuery();
  const didSubscribed = userData?.me.subscriptions.some(
    (sub) => sub.id === +podcastId
  );

  const onToggleSubscribeMutationCompleted = (
    data: toggleSubscribeMutation
  ) => {
    const {
      toggleSubscribe: { ok, err },
    } = data;
    if (ok && userData?.me) {
      client.writeQuery<meQuery>({
        query: ME_QUERY,
        data: {
          me: {
            ...userData.me,
            subscriptions: userData.me.subscriptions.some(
              (sub) => sub.id === +podcastId
            )
              ? userData.me.subscriptions.filter((sub) => sub.id !== +podcastId)
              : [
                  ...userData.me.subscriptions,
                  { __typename: "Podcast", id: +podcastId },
                ],
          },
        },
      });
    } else {
      console.log(err);
    }
  };

  const { loading, data, fetchMore } = useQuery<
    getPodcastQuery,
    getPodcastQueryVariables
  >(GET_PODCAST_QUERY, {
    variables: { input: { podcastId: +podcastId } },
  });

  const rating = data?.getPodcast.podcast?.rating;

  const [
    toggleSubscribeMutation,
    { loading: toggleSubscribeLoading },
  ] = useMutation<toggleSubscribeMutation, toggleSubscribeMutationVariables>(
    TOGGLE_SUBSCRIBE_MUTATION,
    {
      onCompleted: onToggleSubscribeMutationCompleted,
    }
  );

  const loadMoreEpisodes = async () => {
    if (data?.getPodcast.currentPage) {
      setFetchMoreLoading(true);
      await fetchMore({
        variables: {
          input: {
            podcastId: +podcastId,
            page: data.getPodcast.currentPage + 1,
          },
        },
        updateQuery: (previouseData, { fetchMoreResult }) => {
          if (
            previouseData.getPodcast.podcast &&
            fetchMoreResult?.getPodcast.podcast
          ) {
            return {
              getPodcast: {
                ...fetchMoreResult.getPodcast,
                podcast: {
                  ...fetchMoreResult?.getPodcast.podcast,
                  episodes: [
                    ...previouseData.getPodcast.podcast?.episodes,
                    ...fetchMoreResult?.getPodcast.podcast?.episodes,
                  ],
                },
              },
            };
          } else {
            return previouseData;
          }
        },
      });
      setFetchMoreLoading(false);
    }
  };

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
              <>
                <div className="animate-pulse w-48 h-3 bg-gray-200 rounded-full mb-2"></div>
                <div className="animate-pulse w-28 h-3 bg-gray-200 rounded-full mb-2"></div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="text-xl mb-1">
                    {data?.getPodcast.podcast?.title}
                  </h2>
                  <div className="flex items-center">
                    {rating && <RatingStars rating={rating} />}
                    <span className="ml-1 text-sm text-gray-500">
                      {data?.getPodcast.podcast?.rating &&
                        `(${data.getPodcast.podcast.rating})`}
                    </span>
                  </div>
                </div>
                <h5 className="text-xs text-gray-600">
                  {data?.getPodcast.podcast?.creator.username}
                </h5>
              </>
            )}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={() => {
                  toggleSubscribeMutation({
                    variables: { input: { podcastId: +podcastId } },
                  });
                }}
                active={didSubscribed}
                disabled={toggleSubscribeLoading}
                icon={faPlus}
                activeIcon={faCheck}
                text="Subscribe"
                activeText="Subscribed"
              />
              <Button
                onClick={() => {
                  setIsReviewsOpen(true);
                }}
                text="Reviews"
                icon={faPenNib}
              />
            </div>
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
      <div className="flex justify-center">
        {data?.getPodcast.currentPage !== data?.getPodcast.totalPages && (
          <button
            className={`border rounded-full text-sm text-gray-600 w-28 h-8 focus:outline-none hover:bg-gray-100 active:bg-gray-300 ${
              fetchMoreLoading && "animate-pulse"
            }`}
            onClick={loadMoreEpisodes}
            disabled={fetchMoreLoading}
          >
            {fetchMoreLoading ? (
              <div className="relative">
                <span
                  role="img"
                  aria-label="heart"
                  className="absolute animate-ping"
                >
                  ❤
                </span>
                <span role="img" aria-label="heart">
                  ❤
                </span>
              </div>
            ) : (
              <span>Load more</span>
            )}
          </button>
        )}
      </div>
      {userData && (
        <ReviewsDrawer
          userData={userData}
          myRating={data?.getPodcast.myRating?.rating}
          podcastId={+podcastId}
          isReviewsOpen={isReviewsOpen}
          setIsReviewsOpen={setIsReviewsOpen}
        />
      )}
    </main>
  );
};
