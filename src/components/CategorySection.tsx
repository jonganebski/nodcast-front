import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { getCategoriesQueryListner_getCategories_categories } from "../__generated__/getCategoriesQueryListner";
import { PodcastBlock } from "./PodcastBlock";

interface ICategorySectionProps {
  category: getCategoriesQueryListner_getCategories_categories;
}

const PODCASTS_PER_PAGE = 5;

export const CategorySection: React.FC<ICategorySectionProps> = ({
  category,
}) => {
  const [page, setPage] = useState(1);
  const podcastsCount = category.podcasts.length;
  const maxPage = Math.ceil(podcastsCount / PODCASTS_PER_PAGE);
  const podcastsLeft = podcastsCount - (maxPage - 1) * PODCASTS_PER_PAGE;

  const getTranslateX = () => {
    if (podcastsCount <= PODCASTS_PER_PAGE) {
      return 0;
    }
    if (page === maxPage) {
      return -8.25 * (page - 2) * PODCASTS_PER_PAGE - 8.25 * podcastsLeft;
    } else {
      return -8.25 * (page - 1) * PODCASTS_PER_PAGE;
    }
  };

  return (
    <section key={category.id}>
      <h3 className="text-lg mb-2">{category.name}</h3>
      <div className="relative">
        <div className="overflow-hidden">
          <ul
            className="grid gap-5 grid-flow-col max-w-screen-sm transition-all duration-1000"
            style={{
              transform: `translate(calc(${getTranslateX()}rem))`,
            }}
          >
            {category.podcasts.map((podcast, index) => {
              return (
                <PodcastBlock podcast={podcast} index={index} key={index} />
              );
            })}
          </ul>
        </div>
        {page !== 1 && (
          <button
            className="home-arrow-btn -left-5"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        {page !== maxPage && (
          <button
            className="home-arrow-btn -right-5"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </section>
  );
};
