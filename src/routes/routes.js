import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";

export default function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/app" component={Home} />
    </BrowserRouter>
  );
}
