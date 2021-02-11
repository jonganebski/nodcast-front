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
];

export const LoggedInRouter = () => {
  const { data } = useMeQuery();

  return (
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
      <div className="fixed z-10 bottom-0 bg-gray-300 w-full h-20">dasd</div>
    </Router>
  );
};
