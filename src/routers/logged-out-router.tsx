import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Auth } from "../pages/Auth";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
