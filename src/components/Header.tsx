import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import { TOKEN_NAME } from "../constants";
import { useSearchPodcastsQuery } from "../hooks/useSearchPodcastsQuery";
import { UserRole } from "../__generated__/globalTypes";
import { meQuery_me } from "../__generated__/meQuery";
import { Avatar } from "./Avatar";
import { EditProfileModal } from "./EditProfileModal";

interface IHeaderProps {
  me: meQuery_me | undefined;
}

export const Header: React.FC<IHeaderProps> = ({ me }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const timeoutIdRef = useRef<any>();
  const ulRef = useRef<HTMLUListElement | null>(null);
  const [isUserPopup, setIsUserPopup] = useState(false);
  const history = useHistory();
  const [searchPodcastsQuery, { data, loading }] = useSearchPodcastsQuery();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    const hide = () => {
      setShowSearchResults(false);
      setIsUserPopup(false);
    };
    document.addEventListener("click", hide);
    return () => document.removeEventListener("click", hide);
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
    <header
      className="py-2 w-full grid place-items-center"
      style={{ gridTemplateColumns: "1fr 8fr 1fr" }}
    >
      <div></div>
      <div className="relative w-full max-w-screen-md">
        {me?.role === UserRole.Listener && (
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
        )}
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
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <Avatar
        me={me}
        src={me?.avatarUrl ?? ""}
        className="my-3"
        onClick={(e) => {
          e.stopPropagation();
          setIsUserPopup(!isUserPopup);
        }}
      >
        {isUserPopup && me && (
          <ul className="absolute z-10 grid gap-px bg-gray-300 top-12 right-0 border rounded-md shadow-lg whitespace-nowrap overflow-hidden text-sm">
            <li
              className="px-10 py-3 bg-white hover:bg-gray-100"
              onClick={() => history.push("/")}
            >
              Home
            </li>
            {me.role === UserRole.Listener && (
              <>
                <li
                  className="px-10 py-3 bg-white hover:bg-gray-100"
                  onClick={() => history.push("/feeds")}
                >
                  My feed
                </li>
                <li
                  className="px-10 py-3 bg-white hover:bg-gray-100"
                  onClick={() => history.push("/subscriptions")}
                >
                  Subscriptions
                </li>
              </>
            )}
            {me.role === UserRole.Host && (
              <>
                <li
                  className="px-10 py-3 bg-white hover:bg-gray-100"
                  onClick={() => history.push("/episodes")}
                >
                  My episodes
                </li>
                <li
                  className="px-10 py-3 bg-white hover:bg-gray-100"
                  onClick={() => history.push("/edit-podcast")}
                >
                  Edit podcast
                </li>
              </>
            )}
            <li
              className="px-10 py-3 bg-white hover:bg-gray-100"
              onClick={() => setIsEditProfileOpen(true)}
            >
              Edit profile
            </li>
            <li
              className="px-10 py-3 bg-white hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem(TOKEN_NAME);
                isLoggedInVar(false);
                history.go(0);
              }}
            >
              Log out
            </li>
          </ul>
        )}
      </Avatar>
      {me && (
        <EditProfileModal
          isEditProfileOpen={isEditProfileOpen}
          setIsEditProfileOpen={setIsEditProfileOpen}
          me={me}
        />
      )}
    </header>
  );
};
