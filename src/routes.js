import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";

import Loading from "./components/Loading";

const loginLoadable = Loadable({
  loader: () => import("./scenes/login"),
  loading: Loading
});

const dashboardLoadable = Loadable({
  loader: () => import("./scenes/dashboard"),
  loading: Loading
});

const Routes = () => (
  <Switch>
    <Redirect from="/login" to="/" />
    <Route exact={true} path="/" component={loginLoadable} />
    <Route exact={true} path="/dashboard" component={dashboardLoadable} />
  </Switch>
);

export default Routes;
