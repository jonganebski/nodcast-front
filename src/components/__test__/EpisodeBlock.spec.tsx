import { render } from "@testing-library/react";
import React from "react";
import { computeTimelapse } from "../../helpers";
import { getPodcastQuery_getPodcast_podcast_episodes } from "../../__generated__/getPodcastQuery";
import { Categories } from "../../__generated__/globalTypes";
import { EpisodeBlock } from "../EpisodeBlock";

const MOCK_EPISODE: getPodcastQuery_getPodcast_podcast_episodes = {
  id: 1,
  title: "Mock episode",
  __typename: "Episode",
  createdAt: "2020-02-02",
  description: "This is mock episode",
};

describe("<EpisodeBlock />", () => {
  it("renders OK with props", () => {
    const { getByText } = render(<EpisodeBlock episode={MOCK_EPISODE} />);

    getByText(MOCK_EPISODE.title);
    getByText(MOCK_EPISODE.description!);
    getByText(computeTimelapse(MOCK_EPISODE.createdAt));
  });
});
