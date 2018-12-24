import gql from 'graphql-tag';

import { UserInfoFragment } from '../fragments/user.fragment';

export const meQuery = gql`
  query Me {
    me {
      ...UserInfo
    }
  }
  ${UserInfoFragment}
`;
