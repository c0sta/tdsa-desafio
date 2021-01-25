import React from "react";
import { FormProvider, ModalProvider } from "../../../providers";
import { SnackbarProvider } from "notistack";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "..";

const renderWithProviders = () => {
  return render(
    <SnackbarProvider>
      <FormProvider>
        <ModalProvider>
          <Header />
        </ModalProvider>
      </FormProvider>
    </SnackbarProvider>
  );
};

describe("Header", () => {
  it("should render search and language menu", () => {
    const { getByTestId, debug } = renderWithProviders();
    expect(getByTestId("search")).toBeTruthy();
    expect(getByTestId("lang-menu")).toBeTruthy();
    debug();
  });

  it("should input value for search", () => {
    const { getByLabelText } = renderWithProviders();

    const searchInput = getByLabelText("search");

    fireEvent.change(searchInput, {
      target: {
        value: "test",
      },
    });

    expect(searchInput.value).toBe("test");
  });

  it("should change language to english", () => {
    const { getByTestId } = renderWithProviders();

    const englishOption = getByTestId("en");
    const headerTitle = getByTestId("header-title");

    fireEvent.click(englishOption, {
      target: {
        value: "en",
      },
    });

    expect(headerTitle.textContent).toBe("Home");
  });
  it("should change language to portuguese", () => {
    const { getByTestId } = renderWithProviders();

    const portugueseOption = getByTestId("pt");
    const headerTitle = getByTestId("header-title");

    fireEvent.click(portugueseOption, {
      target: {
        value: "pt",
      },
    });
    expect(headerTitle.textContent).toBe("Página inicial");
  });
});
