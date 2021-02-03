import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { computeTimelapse } from "../../helpers";
import { getAllPodcastsQuery_getAllPodcasts_podcasts } from "../../__generated__/getAllPodcastsQuery";
import { Categories } from "../../__generated__/globalTypes";
import { PodcastBlock } from "../PodcastBlock";

const MOCK_PODCAST: getAllPodcastsQuery_getAllPodcasts_podcasts = {
  id: 1,
  title: "Mock podcast",
  __typename: "Podcast",
  category: Categories.Arts,
  rating: 0,
  updatedAt: "2020-02-02",
};

describe("<PodcastBlock />", () => {
  it("renders OK with props", () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <PodcastBlock podcast={MOCK_PODCAST} />
      </BrowserRouter>
    );

    getByText(MOCK_PODCAST.title);
    getByText(computeTimelapse(MOCK_PODCAST.updatedAt));
    expect(container.firstChild?.firstChild).toHaveAttribute(
      "href",
      `/podcasts/${MOCK_PODCAST.id}`
    );
  });
});
