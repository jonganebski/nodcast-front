import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAudioContext } from "../contexts/audioPlayerContext";
import { computeTimelapse, shapeAudioDuration } from "../helpers";
import { getEpisodesQuery_getEpisodes_episodes } from "../__generated__/getEpisodesQuery";
import { getFeedQuery_getFeed_episodes } from "../__generated__/getFeedQuery";
import { getPodcastQuery_getPodcast_podcast_episodes } from "../__generated__/getPodcastQuery";
import { Button } from "./Button";
import { PodcastCover } from "./PodcastCover";

interface IEpisodeBlockProps {
  episode: Partial<
    getPodcastQuery_getPodcast_podcast_episodes &
      getFeedQuery_getFeed_episodes &
      getEpisodesQuery_getEpisodes_episodes
  >;
  isCreator?: boolean;
  podcastTitle?: string;
  coverUrl?: string | undefined | null;
  startEditEpisode?: (episodeId: number) => void;
  setDeleteTargetId?: React.Dispatch<React.SetStateAction<number | null>>;
}

export const EpisodeBlock: React.FC<IEpisodeBlockProps> = ({
  episode,
  isCreator = false,
  podcastTitle,
  coverUrl,
  startEditEpisode = () => {},
  setDeleteTargetId = () => {},
}) => {
  const location = useLocation();
  const { setTrack, setIsPaused, track, isPaused } = useAudioContext();
  return (
    <li className="bg-white py-5 flex">
      {episode.podcast && location.pathname.includes("feeds") && (
        <Link to={`/podcasts/${episode.podcast.id}`} className="mr-5">
          <PodcastCover coverUrl="" title={episode.podcast.title} />
        </Link>
      )}
      <div className="w-full">
        {episode.podcast && location.pathname.includes("feeds") && (
          <h3 className="text-gray-800">{episode.podcast.title}</h3>
        )}
        <span className="text-xs text-gray-500">
          {computeTimelapse(episode.createdAt)}
        </span>
        <h4
          className={`text-md text-gray-800 font-semibold mb-2 ${
            !isCreator && "cursor-pointer hover:underline"
          }`}
        >
          {isCreator ? (
            episode.title
          ) : (
            <Link to={`/episodes/${episode.id}`}>{episode.title}</Link>
          )}
        </h4>
        <p
          className={`mb-4 text-sm text-gray-600 ${
            !isCreator && "overflow-ellipsis overflow-hidden"
          }`}
          style={
            !isCreator
              ? {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }
              : {}
          }
        >
          {episode.description}
        </p>
        <div className="flex justify-between">
          <Button
            text={shapeAudioDuration(episode.dutationSeconds)}
            loading={!isPaused && !!track}
            icon={faPlayCircle}
            onClick={() => {
              if (track) {
                setIsPaused(true);
              } else {
                if (episode.title && episode.audioUrl && podcastTitle) {
                  setTrack({
                    audioUrl: episode.audioUrl,
                    episodeTitle: episode.title,
                    podcastTitle,
                    coverUrl: coverUrl ?? "",
                  });
                }
              }
            }}
          />
          {isCreator && (
            <div className="grid grid-cols-2 gap-x-6">
              <span
                className="text-sm underline cursor-pointer hover:text-blue-600"
                onClick={() => {
                  if (episode.id) {
                    startEditEpisode(episode.id);
                  }
                }}
              >
                Edit
              </span>
              <span
                className="text-sm underline cursor-pointer hover:text-red-600"
                onClick={() => {
                  if (episode.id) {
                    setDeleteTargetId(episode.id);
                  }
                }}
              >
                Delete
              </span>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
