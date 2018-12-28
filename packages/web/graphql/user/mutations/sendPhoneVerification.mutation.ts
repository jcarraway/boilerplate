import gql from 'graphql-tag';

export const sendPhoneVerification = gql`
  mutation sendPhoneVerificationMutation($phoneNumber: String!) {
    sendPhoneVerification(phoneNumber: $phoneNumber) {
      errors {
        path
        message
      }
      success
    }
  }
`;
