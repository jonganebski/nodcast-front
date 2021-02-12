import { gql, useQuery } from "@apollo/client";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { PodcastCover } from "../components/PodcastCover";
import { EPISODE_FRAGMENT } from "../fragments";
import { computeTimelapse, shapeAudioDuration } from "../helpers";
import {
  getEpisodeQuery,
  getEpisodeQueryVariables,
} from "../__generated__/getEpisodeQuery";

const GET_EPISODE_QUERY = gql`
  query getEpisodeQuery($input: GetEpisodeInput!) {
    getEpisode(input: $input) {
      ok
      err
      episode {
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

interface IParams {
  episodeId: string;
}

export const Episode = () => {
  const { episodeId } = useParams<IParams>();
  const { data } = useQuery<getEpisodeQuery, getEpisodeQueryVariables>(
    GET_EPISODE_QUERY,
    { variables: { input: { episodeId: +episodeId } } }
  );

  return (
    <main className="container">
      <Helmet>
        <title>{data?.getEpisode.episode?.title ?? ""} | Nodcast</title>
      </Helmet>
      <section className="flex mb-10">
        <PodcastCover coverUrl="" title="" size={12} />
        <div className="ml-5">
          <h2 className="text-blue-600 cursor-pointer hover:underline">
            <Link to={`/podcasts/${data?.getEpisode.episode?.podcast.id}`}>
              {data?.getEpisode.episode?.podcast.title}
            </Link>
          </h2>
          <span className="text-sm text-gray-500">
            {computeTimelapse(data?.getEpisode.episode?.createdAt)}
          </span>
        </div>
      </section>
      <section>
        <h3 className=" mb-4 text-lg font-semibold">
          {data?.getEpisode.episode?.title}
        </h3>
        <Button
          text={`Play • ${shapeAudioDuration(
            data?.getEpisode.episode?.dutationSeconds
          )}`}
          icon={faPlayCircle}
          className="mb-8"
        />
        <p className="text-sm text-gray-700">
          {data?.getEpisode.episode?.description}
        </p>
      </section>
    </main>
  );
};
