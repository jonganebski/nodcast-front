import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IRatingStarsProps {
  rating: number;
}

export const RatingStars: React.FC<IRatingStarsProps> = ({ rating }) => {
  return (
    <div>
      {Array(Math.floor(rating))
        .fill("")
        .map((_, i) => (
          <FontAwesomeIcon
            className="text-yellow-400 text-xs"
            icon={faStar}
            key={i}
          />
        ))}
      {0.5 <= rating - Math.floor(rating) && (
        <FontAwesomeIcon
          className="text-yellow-400 text-xs"
          icon={faStarHalf}
        />
      )}
    </div>
  );
};
