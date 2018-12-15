import gql from "graphql-tag";

export const RegisterMutation = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      
    }
  }
`;