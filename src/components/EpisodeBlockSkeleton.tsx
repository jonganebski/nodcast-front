import React from "react";

export const EpisodeBlockSkeleton = () => {
  return (
    <li className="py-5 bg-white">
      <div className="animate-pulse w-1/6 bg-gray-200 h-2 rounded-full mb-4"></div>
      <div className="animate-pulse w-3/6 bg-gray-200 h-2 rounded-full mb-4"></div>
      <div className="animate-pulse bg-gray-200 h-2 rounded-full mb-3"></div>
      <div className="animate-pulse bg-gray-200 h-2 rounded-full mb-6"></div>
      <div className="animate-pulse w-24 h-5 bg-gray-200 rounded-full"></div>
    </li>
  );
};
