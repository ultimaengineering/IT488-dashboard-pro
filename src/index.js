import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import AuthLayout from "layouts/Auth/Auth.js";
import AdminLayout from "layouts/Admin/Admin.js";

import "assets/css/nucleo-icons.css";
import "react-notification-alert/dist/animate.css";
import "assets/scss/black-dashboard-pro-react.scss?v=1.2.0";
import "assets/demo/demo.css";
import ReactGA from 'react-ga';

const root = ReactDOM.createRoot(document.getElementById("root"));
const TRACKING_ID = "UA-73826242-3"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

root.render(
  <BrowserRouter>
    <Switch>
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
);
