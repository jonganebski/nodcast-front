import { ApolloProvider } from "@apollo/client";
import { act, render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient } from "mock-apollo-client";
import { BrowserRouter } from "react-router-dom";
import { SEARCH_PODCASTS_QUERY } from "../../hooks/useSearchPodcastsQuery";
import { Categories } from "../../__generated__/globalTypes";
import {
  searchPodcastsQuery,
  searchPodcastsQuery_searchPodcasts_podcasts,
} from "../../__generated__/searchPodcastsQuery";
import { Header } from "../Header";

const mockPodcasts: searchPodcastsQuery_searchPodcasts_podcasts[] = [
  {
    id: 1,
    __typename: "Podcast",
    category: Categories.Arts,
    rating: 0,
    title: "Podcast A",
    updatedAt: "2020-02-02",
    creator: {
      __typename: "User",
      email: "mock@user1.com",
    },
  },
  {
    id: 2,
    __typename: "Podcast",
    category: Categories.Business,
    rating: 0,
    title: "Podcast B",
    updatedAt: "2020-02-02",
    creator: {
      __typename: "User",
      email: "mock@user2.com",
    },
  },
];

const MOCK_SEARCHTERM = "mock007";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => {
  const realModule = jest.requireActual("react-router-dom");
  return {
    ...realModule,
    useHistory: () => {
      return { push: mockPush };
    },
  };
});

describe("<Header />", () => {
  let renderResult: RenderResult;
  const mockClient = createMockClient();

  beforeAll(async () => {
    await waitFor(() => {
      mockClient.setRequestHandler(SEARCH_PODCASTS_QUERY, () =>
        Promise.resolve({
          data: {
            searchPodcasts: { podcasts: mockPodcasts },
          } as searchPodcastsQuery,
        })
      );
    });
  });

  beforeEach(async () => {
    await waitFor(() => {
      renderResult = render(
        <ApolloProvider client={mockClient}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </ApolloProvider>
      );
    });
  });

  it("should render OK", () => {
    const { getByPlaceholderText } = renderResult;
    getByPlaceholderText(/Search podcast/i);
  });

  it("should show search results and hide results on body click", async () => {
    jest.useFakeTimers();
    const { getByPlaceholderText, container } = renderResult;
    const searchInput = getByPlaceholderText(/Search podcast/i);
    await waitFor(() => {
      userEvent.click(searchInput);
      userEvent.paste(searchInput, MOCK_SEARCHTERM);
    });
    act(() => {
      jest.advanceTimersByTime(1500);
    });
    await waitFor(() => {
      expect(container.querySelector("ul")).toBeVisible();
    });
    await waitFor(() => {
      userEvent.click(document.body);
    });
    expect(container.querySelector("ul")).toBeNull();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
