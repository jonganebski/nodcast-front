import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    subscribersCount
    description
    updatedAt
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    id
    title
    createdAt
    description
    audioUrl
    dutationSeconds
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment ReviewParts on Review {
    id
    text
    createdAt
    updatedAt
    creator {
      id
      username
    }
  }
`;
