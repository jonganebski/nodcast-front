import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { useMeQuery } from "../hooks/useMeQuery";
import { EditProfile } from "../pages/Edit-profile";
import { Home } from "../pages/Home";
import { Home as HostHome } from "../pages/Hosts/Home";
import { DashBoard } from "../pages/Hosts/Dashboard";
import { Podcast } from "../pages/Podcast";
import { UserRole } from "../__generated__/globalTypes";

const commonRoutes = [{ path: "/edit-profile", component: <EditProfile /> }];

const listenerRoutes = [
  { path: "/", component: <Home /> },
  { path: "/podcasts/:podcastId", component: <Podcast /> },
].concat(commonRoutes);

const hostRoutes = [
  { path: "/", component: <HostHome /> },
  { path: "/podcasts/:podcastId", component: <DashBoard /> },
].concat(commonRoutes);

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
      <div className="fixed z-50 bottom-0 bg-gray-300 w-full h-20">dasd</div>
    </Router>
  );
};
