import React from "react";

interface IPodcastCover {
  coverUrl: string;
  title: string;
  size?: number;
}

export const PodcastCover: React.FC<IPodcastCover> = ({
  coverUrl,
  title,
  size = 28,
}) => {
  return (
    <div
      className={`relative z-0 bg-gray-700 w-${size} h-${size} rounded-lg overflow-hidden`}
    >
      {coverUrl ? (
        <img
          className="object-cover mb-1 w-full h-full"
          src={coverUrl}
          alt="podcast-cover"
        />
      ) : (
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm text-gray-200">
          {title}
        </span>
      )}
    </div>
  );
};
