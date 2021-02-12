import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      username
      role
      avatarUrl
      subscriptions {
        id
      }
    }
  }
`;

export const useMeQuery = () => {
  return useQuery<meQuery>(ME_QUERY);
};
