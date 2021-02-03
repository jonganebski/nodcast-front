import React from "react";

export const PodcastBlockSkeleton = () => {
  return (
    <li>
      <div className="object-cover rounded-lg mb-2 w-full h-28 bg-gray-200"></div>
      <div className="w-full h-2 bg-gray-200 rounded-full mb-1"></div>
      <div className="w-2/3 h-2 bg-gray-200 rounded-full"></div>
    </li>
  );
};
