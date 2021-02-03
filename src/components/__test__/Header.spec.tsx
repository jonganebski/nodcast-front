import { ApolloProvider } from "@apollo/client";
import {
  RenderResult,
  waitFor,
  render,
  act,
  getByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import { SEARCH_PODCASTS_QUERY } from "../../hooks/useSearchPodcastsQuery";
import { searchPodcastsQueryVariables } from "../../__generated__/searchPodcastsQuery";
import { Header } from "../Header";
import React from "react";

describe("<Header />", () => {
  let renderResult: RenderResult;
  let mockedClient = createMockClient();

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <Header />
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    const { getByPlaceholderText } = renderResult;
    await waitFor(() => {
      getByPlaceholderText(/search podcast/i);
    });
  });

  it("should call search query on input", async () => {
    const { getByPlaceholderText, getByText } = renderResult;
    const searchInputElement = getByPlaceholderText(/search podcast/i);

    const mockedQueryResponse = jest.fn().mockResolvedValue({
      data: {
        searchPodcasts: {
          ok: true,
          podcasts: [
            {
              id: 1,
              title: "Mock Podcast",
              creator: { email: "agent@mock.com" },
            },
          ],
        },
      },
    });

    mockedClient.setRequestHandler(SEARCH_PODCASTS_QUERY, mockedQueryResponse);
    await waitFor(async () => {
      userEvent.paste(searchInputElement, "Mock");
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await waitFor(() => {
      expect(mockedQueryResponse).toHaveBeenCalledTimes(1);
      expect(mockedQueryResponse).toHaveBeenCalledWith({
        input: { titleQuery: "Mock", page: 1 },
      } as searchPodcastsQueryVariables);
      getByText("Mock");
    });
  });

  //   it("should push to the podcast's page", async () => {
  //     const { getByPlaceholderText } = renderResult;
  //     const searchInputElement = getByPlaceholderText(/search podcast/i);
  //     const body = await waitFor(async () => {
  //       userEvent.paste(searchInputElement, "Mock");
  //     });
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //   });
  it.todo("should hide search results on click body");
  it.todo("should show search results on click input");
});
