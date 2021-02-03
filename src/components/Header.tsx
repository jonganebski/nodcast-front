import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSearchPodcastsQuery } from "../hooks/useSearchPodcastsQuery";

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const timeoutIdRef = useRef<any>();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const history = useHistory();
  const [searchPodcastsQuery, { data, loading }] = useSearchPodcastsQuery();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    const hideSearch = () => {
      setShowSearchResults(false);
    };
    document.body.addEventListener("click", hideSearch);
    return () => document.body.removeEventListener("click", hideSearch);
  }, []);

  useEffect(() => {
    if (2 < searchTerm.length) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  }, [searchTerm.length]);

  useEffect(() => {
    if (2 < searchTerm.length) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        searchPodcastsQuery({
          variables: { input: { page: 1, titleQuery: searchTerm } },
        });
      }, 1000);
    }
  }, [searchPodcastsQuery, searchTerm]);

  return (
    <header className="py-2 w-full flex justify-center">
      <div className="relative w-full max-w-screen-md">
        <input
          className="p-3 outline-none bg-gray-100 w-full rounded-md focus:shadow-md focus:bg-white transition-all pointer-events-auto"
          style={{ pointerEvents: "all" }}
          placeholder="Search podcast"
          onChange={onChange}
          value={searchTerm}
          onClick={(e) => {
            e.stopPropagation();
            setShowSearchResults(true);
          }}
        />
        {showSearchResults && (
          <ul
            className="grid absolute border rounded-b-md overflow-hidden w-full gap-px bg-gray-200 shadow-md"
            ref={ulRef}
          >
            {data?.searchPodcasts.podcasts?.map((podcast) => {
              return (
                <li
                  className="p-3 flex justify-between bg-transparent w-full cursor-pointer bg-white hover:bg-gray-100"
                  onClick={() => {
                    setSearchTerm("");
                    history.push(`/podcasts/${podcast.id}`);
                  }}
                  key={podcast.id}
                >
                  <span className="text-gray-700">{podcast.title}</span>
                  <span className="text-sm text-gray-500">
                    by {podcast.creator.email}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </header>
  );
};
