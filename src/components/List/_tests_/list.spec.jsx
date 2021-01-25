import React from "react";
import { FormProvider, ModalProvider } from "../../../providers";
import { SnackbarProvider } from "notistack";
import { render, screen } from "@testing-library/react";
import { List } from "..";

const renderWithProviders = ({ isPosts }) => {
  return render(
    <SnackbarProvider>
      <FormProvider>
        <ModalProvider>
          {isPosts ? <List isPosts /> : <List isComments />}
        </ModalProvider>
      </FormProvider>
    </SnackbarProvider>
  );
};

describe("List", () => {
  it("should render all posts if isPosts", async () => {
    renderWithProviders({ isPosts: true });
    const items = await screen.findAllByTestId("post-item");
    expect(items).toHaveLength(100);
  });
});
