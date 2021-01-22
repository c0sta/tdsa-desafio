import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { ModalProvider } from "../providers/modal";

export default function Routes() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Route path="/" exact component={Login} />
        <Route path="/app" exact component={Home} />
      </BrowserRouter>
    </ModalProvider>
  );
}
