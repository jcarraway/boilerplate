import gql from 'graphql-tag';

import { UserInfoFragment } from '../fragments/user.fragment';

export const meQuery = gql`
  query MeQuery {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`;
