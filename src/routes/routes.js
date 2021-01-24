import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { ModalProvider } from "../providers/modal";
import { FormProvider } from "../providers/form";

export default function Routes() {
  return (
    <FormProvider>
      <ModalProvider>
        <BrowserRouter>
          <Route path="/" exact component={Login} />
          <Route path="/app" component={Home} />
        </BrowserRouter>
      </ModalProvider>
    </FormProvider>
  );
}
