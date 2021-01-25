import React from "react";
import Home from "..";
import { FormProvider, ModalProvider } from "../../../providers";
import { SnackbarProvider } from "notistack";
import { render } from "@testing-library/react";

const renderWithProviders = () => {
  return render(
    <SnackbarProvider>
      <FormProvider>
        <ModalProvider>
          <Home />
        </ModalProvider>
      </FormProvider>
    </SnackbarProvider>
  );
};

describe("<Home />", () => {
  it("should render button to add a Post", () => {
    const { getByTestId } = renderWithProviders();
    expect(getByTestId("add-button")).toBeTruthy();
  });
  it("should render List to show posts", () => {
    const { getByTestId } = renderWithProviders();
    expect(getByTestId("post-list")).toBeTruthy();
  });

  it("should render header with home title", () => {
    const { getByTestId } = renderWithProviders();
    expect(getByTestId("header")).toHaveTextContent("Home");
  });
});
