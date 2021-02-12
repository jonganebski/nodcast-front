import React from "react";

interface IPodcastCover {
  coverUrl: string;
  title: string;
  size: "sm" | "md" | "lg";
}

export const PodcastCover: React.FC<IPodcastCover> = ({
  coverUrl,
  title,
  size,
}) => {
  return (
    <div
      className={`relative z-0 bg-gray-700 rounded-lg overflow-hidden ${
        size === "sm" ? "w-12 h-12" : size === "md" ? "w-20 h-20" : "w-28 h-28"
      }`}
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
