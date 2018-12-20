import gql from 'graphql-tag';

export const forgotPasswordChange = gql`
  mutation forgotPasswordChangeMutation($input: ForgotPasswordChangeInput!) {
    forgotPasswordChange(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
