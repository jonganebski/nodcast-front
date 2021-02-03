import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header";
import { Home } from "../pages/Home";
import { Podcast } from "../pages/Podcast";
export const LoggedInRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/podcasts/:podcastId">
          <Podcast />
        </Route>
      </Switch>
    </Router>
  );
};
