import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { useMeQuery } from "../hooks/useMeQuery";
import { Home } from "../pages/Home";
import { Podcast } from "../pages/Podcast";
import { UserRole } from "../__generated__/globalTypes";

const listenerRoutes = [
  { path: "/", component: <Home /> },
  { path: "/podcasts/:podcastId", component: <Podcast /> },
];

const hostRoutes = [{ path: "/", component: null }];

export const LoggedInRouter = () => {
  const { data } = useMeQuery();
  return (
    <Router>
      {data?.me.role === UserRole.Host && (
        <Switch>
          {hostRoutes.map((route, i) => (
            <Route exact path={route.path} key={i}>
              {route.component}
            </Route>
          ))}
        </Switch>
      )}
      {data?.me.role === UserRole.Listener && (
        <>
          <Header />
          <Switch>
            {listenerRoutes.map((route, i) => (
              <Route exact path={route.path} key={i}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </>
      )}
    </Router>
  );
};
