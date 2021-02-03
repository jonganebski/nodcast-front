import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
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

describe("<Podcast />", () => {
  let renderResult: RenderResult;
  let mockedClient = createMockClient();

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <HelmetProvider>
            <Podcast />
          </HelmetProvider>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Podcast | Nodcast");
    });
  });

  it("should call getPodcast query", async () => {
    const { getByText } = renderResult;
    const mockQueryResponse = jest.fn().mockResolvedValue({
      data: {
        getPodcast: {
          ok: true,
          error: "Query error",
          podcasts: [MOCK_PODCAST],
        },
      },
    });
    mockedClient.setRequestHandler(GET_PODCAST_QUERY, mockQueryResponse);
    await new Promise((resolve) => setTimeout(resolve, 0));
    await waitFor(() => {
      expect(mockQueryResponse).toHaveBeenCalledTimes(1);
      getByText(MOCK_PODCAST.title);
      getByText(MOCK_PODCAST.creator.email.split("@")[0]);
      getByText("Subscribe");
      getByText(MOCK_PODCAST.description);
      getByText("Available episodes");
    });
  });
});
