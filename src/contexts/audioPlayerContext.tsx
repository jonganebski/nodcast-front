import React, { createContext, ReactNode, useContext, useState } from "react";

interface ITrack {
  audioUrl: string;
  podcastTitle: string;
  episodeTitle: string;
  coverUrl: string;
}

interface IAudioPlayerContext {
  setTrack: React.Dispatch<React.SetStateAction<ITrack | null>>;
  setIsPaused: React.Dispatch<React.SetStateAction<boolean>>;
  track: ITrack | null;
  isPaused: boolean;
}

const AudioPlayerContext = createContext<IAudioPlayerContext | null>(null);

export const AudioPlayerContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [track, setTrack] = useState<ITrack | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  console.log(track, isPaused);
  return (
    <AudioPlayerContext.Provider
      value={{
        setIsPaused,
        setTrack,
        isPaused,
        track,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioContext = () => {
  const audioPlayerContext = useContext(AudioPlayerContext);
  if (audioPlayerContext === null) {
    throw new Error();
  }
  return audioPlayerContext;
};
