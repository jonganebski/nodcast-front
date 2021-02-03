import React from "react";
import { render, waitFor } from "@testing-library/react";
import App from "../App";
import { isLoggedInVar } from "../../apollo";

const LOGGED_OUT_TEXT = "Logged out";
const LOGGED_IN_TEXT = "Logged in";

jest.mock("../../routers/logged-out-router", () => {
  return { LoggedOutRouter: () => <span>{LOGGED_OUT_TEXT}</span> };
});

jest.mock("../../routers/logged-in-router", () => {
  return { LoggedInRouter: () => <span>Logged in</span> };
});

describe("<App />", () => {
  it("renders LoggedOutRouter", () => {
    const { getByText } = render(<App />);
    getByText(LOGGED_OUT_TEXT);
  });
  it("renders LoggedInRouter", async () => {
    const { getByText } = render(<App />);
    await waitFor(() => {
      isLoggedInVar(true);
    });
    getByText(LOGGED_IN_TEXT);
  });
});
