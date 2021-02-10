import React from "react";

interface IEpisodeBlockSkeletonProps {
  isPodcastDataIncluded?: boolean;
}

export const EpisodeBlockSkeleton: React.FC<IEpisodeBlockSkeletonProps> = ({
  isPodcastDataIncluded = false,
}) => {
  return (
    <li className="py-5 bg-white flex">
      {isPodcastDataIncluded && (
        <div className="animate-pulse mr-5 bg-gray-200 w-28 h-28 rounded-lg"></div>
      )}
      <div className="animate-pulse">
        {isPodcastDataIncluded && (
          <div className="w-32 bg-gray-200 h-2 rounded-full mb-4"></div>
        )}
        <div className="w-56 bg-gray-200 h-2 rounded-full mb-4"></div>
        <div className="w-24 bg-gray-200 h-2 rounded-full mb-4"></div>
        <div className="w-96 bg-gray-200 h-2 rounded-full mb-3"></div>
        <div className="bg-gray-200 h-2 rounded-full mb-6"></div>
        <div className="w-24 h-5 bg-gray-200 rounded-full"></div>
      </div>
    </li>
  );
};
