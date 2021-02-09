import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { getAllPodcastsQuery } from "../../__generated__/getAllPodcastsQuery";
import { Categories } from "../../__generated__/globalTypes";
import { GET_ALL_PODCASTS_QUERY, Home } from "../Home";

const mockPodcasts = [
  {
    id: 1,
    __typename: "Podcast",
    category: Categories.Arts,
    rating: 0,
    title: "Podcast A",
    updatedAt: "2020-02-02",
  },
  {
    id: 2,
    __typename: "Podcast",
    category: Categories.Business,
    rating: 0,
    title: "Podcast B",
    updatedAt: "2020-02-02",
  },
];

describe("<Home />", () => {
  let renderResult: RenderResult;
  let mockedClient = createMockClient();

  beforeAll(async () => {
    await waitFor(() => {
      mockedClient.setRequestHandler(GET_ALL_PODCASTS_QUERY, () =>
        Promise.resolve({
          data: {
            getAllPodcasts: {
              ok: true,
              error: "Query error",
              podcasts: mockPodcasts,
            },
          } as getAllPodcastsQuery,
        })
      );
    });
  });

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockedClient}>
          <BrowserRouter>
            <HelmetProvider>
              <Home />
            </HelmetProvider>
          </BrowserRouter>
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
    const { getByText } = renderResult;
    getByText(mockPodcasts[0].category);
    getByText(mockPodcasts[1].category);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
