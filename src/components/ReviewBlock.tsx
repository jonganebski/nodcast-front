import React, { useEffect, useRef, useState } from "react";
import { getReviewsQuery_getReviews_reviews } from "../__generated__/getReviewsQuery";
import { RatingStars } from "./RatingStars";

interface IReviewBlockProps {
  review: getReviewsQuery_getReviews_reviews;
}

export const ReviewBlock: React.FC<IReviewBlockProps> = ({ review }) => {
  const [, setState] = useState(false);
  const pRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    setState((prev) => !prev);
  }, [pRef]);

  return (
    <li className="py-4 bg-white">
      <div className="flex justify-between mb-1">
        <h6>{review.creator.username}</h6>
        <RatingStars rating={review.creator.ratings[0].rating} />
      </div>
      <p
        className="text-gray-800 text-sm overflow-ellipsis overflow-hidden"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
        }}
        ref={pRef}
      >
        {review.text}
      </p>
      {pRef.current && pRef.current.offsetHeight < pRef.current.scrollHeight && (
        <div className="flex justify-end mt-2">
          <span
            className="text-sm underline cursor-pointer"
            onClick={(e) => {
              if (pRef.current) {
                pRef.current.style.display = "block";
                pRef.current.style.webkitLineClamp = "initial";
                e.currentTarget.remove();
              }
            }}
          >
            Read more
          </span>
        </div>
      )}
    </li>
  );
};
