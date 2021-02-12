import {
  faPause,
  faPlay,
  faStop,
  faVolumeDown,
  faVolumeOff,
  faVolumeUp,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useAudioContext } from "../contexts/audioPlayerContext";
import { shapeAudioDurationDetail, shapeDurationLeft } from "../helpers";
import { PodcastCover } from "./PodcastCover";

export const AudioPlayer = () => {
  const { setTrack, setIsPaused, track, isPaused } = useAudioContext();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.5);
  const [audioTime, setAudioTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (audioRef.current) {
      intervalId = setInterval(() => {
        setAudioTime(audioRef.current!.currentTime);
      }, 1000);
      if (isPaused) {
        clearInterval(intervalId);
      }
    }
    return () => clearInterval(intervalId);
  }, [isPaused]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current && track) {
      if (isPaused) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPaused, track]);

  const paintVolumeIcon = (): IconDefinition => {
    const audio = audioRef.current;
    if (audio) {
      if (audio.volume === 0) {
        return faVolumeOff;
      }
      if (audio.volume < 0.5) {
        return faVolumeDown;
      }
      return faVolumeUp;
    }
    return faVolumeUp;
  };

  const paintPlayPauseIcon = (): IconDefinition => {
    if (isPaused) {
      return faPlay;
    }
    return faPause;
  };

  return (
    <section
      className={`fixed z-10 w-full h-20 px-6 grid grid-cols-3 items-center bg-opacity-90 bg-gray-200 transition-all duration-700 ${
        track ? "bottom-0 opacity-100" : "-bottom-20 opacity-0"
      }`}
      style={{ boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)" }}
    >
      <input
        className="duration-range absolute top-0 w-full h-px cursor-pointer"
        type="range"
        min={0}
        max={audioRef.current?.duration ? +audioRef.current.duration : 0}
        value={audioTime}
        onChange={(e) => {
          const time = +e.currentTarget.value;
          if (audioRef.current) {
            audioRef.current.currentTime = time;
            setAudioTime(time);
          }
        }}
      />
      <div className="flex items-center">
        <PodcastCover
          coverUrl={track?.coverUrl ?? ""}
          size="sm"
          title={track?.podcastTitle ?? ""}
        />
        <div className="ml-4 text-sm">
          <h4 className="font-semibold">{track?.episodeTitle}</h4>
          <span>{shapeDurationLeft(audioRef)}</span>
        </div>
      </div>
      <div className="justify-self-center">
        <audio ref={audioRef} src={track?.audioUrl} />
        <button
          className="w-10 h-10 cursor-pointer rounded-full text-gray-600 text-xl active:bg-gray-200 focus:outline-none"
          onClick={() => {
            if (isPaused) {
              setIsPaused(false);
            } else {
              setIsPaused(true);
            }
          }}
        >
          <FontAwesomeIcon icon={paintPlayPauseIcon()} />
        </button>
        <button
          className="w-10 h-10 cursor-pointer rounded-full text-gray-600 text-xl active:bg-gray-200 focus:outline-none"
          onClick={() => {
            setTrack(null);
            if (audioRef.current) {
              audioRef.current.src = "";
            }
          }}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
      <div className="flex items-center justify-end">
        <div className="w-8">
          <FontAwesomeIcon icon={paintVolumeIcon()} />
        </div>
        <input
          className="mr-4 h-1 cursor-pointer"
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => {
            setVolume(+e.currentTarget.value);
          }}
        />
        <span className="text-xs text-gray-600 font-semibold">
          {shapeAudioDurationDetail(audioRef.current?.currentTime)} /{" "}
          {shapeAudioDurationDetail(audioRef.current?.duration)}
        </span>
      </div>
    </section>
  );
};
