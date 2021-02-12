import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    title
    subscribersCount
    description
    updatedAt
    coverUrl
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
      avatarUrl
    }
  }
`;

export const GET_PODCAST_QUERY_FRAGMENT = gql`
  fragment GetPodcastParts on Podcast {
    id
    title
    description
    rating
    subscribersCount
    coverUrl
    creator {
      id
      username
    }
    episodes {
      ...EpisodeParts
    }
    subscribers {
      id
      username
    }
    categories {
      id
      name
    }
  }
  ${EPISODE_FRAGMENT}
`;
