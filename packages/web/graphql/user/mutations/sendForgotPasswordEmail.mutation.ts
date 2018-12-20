import gql from 'graphql-tag';

export const sendForgotPasswordEmail = gql`
  mutation SendForgotPasswordEmailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;
