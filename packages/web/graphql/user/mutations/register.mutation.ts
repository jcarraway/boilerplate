import gql from 'graphql-tag';

import { UserInfoFragment } from '../fragments/user.fragment';

export const registerMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      user {
        ...UserInfo
      }
      errors {
        path
        message
      }
    }
  }
  ${UserInfoFragment}
`;
