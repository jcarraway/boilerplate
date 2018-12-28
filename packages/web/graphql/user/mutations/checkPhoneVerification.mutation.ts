import gql from 'graphql-tag';

export const checkPhoneVerification = gql`
  mutation checkPhoneVerificationMutation($code: String!) {
    checkPhoneVerification(code: $code)
  }
`;
