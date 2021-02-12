import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { useMeQuery } from "../hooks/useMeQuery";
import { Home } from "../pages/Home";
import { Home as HostHome } from "../pages/Hosts/Home";
import { Podcast } from "../pages/Podcast";
import { UserRole } from "../__generated__/globalTypes";
import { Subscriptions } from "../pages/Subscriptions";
import { Feeds } from "../pages/Feeds";
import { Episode } from "../pages/Episode";
import { Episodes } from "../pages/Hosts/Episodes";
import { EditPodcast } from "../pages/Hosts/EditPodcast";
import { AudioPlayer } from "../components/AudioPlayer";
import { AudioPlayerContextProvider } from "../contexts/audioPlayerContext";

const listenerRoutes = [
  { path: "/", component: <Home /> },
  { path: "/podcasts/:podcastId", component: <Podcast /> },
  { path: "/episodes/:episodeId", component: <Episode /> },
  { path: "/subscriptions", component: <Subscriptions /> },
  { path: "/feeds", component: <Feeds /> },
];

const hostRoutes = [
  { path: "/", component: <HostHome /> },
  { path: "/episodes", component: <Episodes /> },
  { path: "/edit-podcast", component: <EditPodcast /> },
];

export const LoggedInRouter = () => {
  const { data } = useMeQuery();

  return (
    <AudioPlayerContextProvider>
      <Router>
        <Header me={data?.me} />
        <Switch>
          {data?.me.role === UserRole.Host &&
            hostRoutes.map((route, i) => (
              <Route exact path={route.path} key={i}>
                {route.component}
              </Route>
            ))}
          {data?.me.role === UserRole.Listener &&
            listenerRoutes.map((route, i) => (
              <Route exact path={route.path} key={i}>
                {route.component}
              </Route>
            ))}
        </Switch>
        <AudioPlayer />
      </Router>
    </AudioPlayerContextProvider>
  );
};
