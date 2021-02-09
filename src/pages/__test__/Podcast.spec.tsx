import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { getPodcastQuery_getPodcast_podcast } from "../../__generated__/getPodcastQuery";
import { Categories } from "../../__generated__/globalTypes";
import { GET_PODCAST_QUERY, Podcast } from "../Podcast";

const MOCK_PODCAST: getPodcastQuery_getPodcast_podcast = {
  id: 1,
  title: "Mock podcast",
  category: Categories.Arts,
  description: "This is mock podcast",
  __typename: "Podcast",
  creator: {
    email: "agent.mocky@faker.com",
    __typename: "User",
  },
  episodes: [
    {
      id: 1,
      title: "Mock episode",
      createdAt: "2020-02-02",
      description: "This is mock episode",
      __typename: "Episode",
    },
  ],
  reviews: [
    { title: "Mock review", text: "This is mock review", __typename: "Review" },
  ],
};

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useParams: () => jest.fn().mockReturnValue({ podcastId: 1 }),
  };
});

describe("<Podcast />", () => {
  let renderResult: RenderResult;
  let mockClient = createMockClient();

  beforeAll(async () => {
    await waitFor(() => {
      mockClient.setRequestHandler(GET_PODCAST_QUERY, () =>
        Promise.resolve({
          data: {
            getPodcast: {
              ok: true,
              error: "Query error",
              podcast: MOCK_PODCAST,
            },
          },
        })
      );
    });
  });

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <HelmetProvider>
              <Podcast />
            </HelmetProvider>
          </BrowserRouter>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Podcast | Nodcast");
    });
  });

  it("render OK with getPodcast query", async () => {
    const { getByText } = renderResult;
    getByText(MOCK_PODCAST.title);
    getByText(MOCK_PODCAST.creator.email.split("@")[0]);
    getByText(MOCK_PODCAST.description);
    let sortBtn = getByText("Newest first");
    await waitFor(() => {
      userEvent.click(sortBtn);
    });
    sortBtn = getByText("Oldest first");
    await waitFor(() => {
      userEvent.click(sortBtn);
    });
    getByText("Newest first");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
