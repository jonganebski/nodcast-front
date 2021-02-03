import { ApolloProvider } from "@apollo/client";
import { render, waitFor } from "@testing-library/react";
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { Home } from "../Home";

describe("<Home />", () => {
  let renderResult;
  let mockedClient = createMockClient();

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Home />
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Home | Nodcast");
    });
  });

  it("should call categories query", async () => {
    return;
  });
});
