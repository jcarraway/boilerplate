export type Maybe<T> = T | null;

export interface ForgotPasswordChangeInput {
  newPassword: string;

  token: string;
}

export interface LoginInput {
  usernameOrEmail: string;

  password: string;
}

export interface RegisterInput {
  username: string;

  email: string;

  password: string;
}

/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
export type DateTime = any;

// ====================================================
// Documents
// ====================================================

export type CheckPhoneVerificationMutationVariables = {
  code: string;
};

export type CheckPhoneVerificationMutationMutation = {
  __typename?: "Mutation";

  checkPhoneVerification: CheckPhoneVerificationMutationCheckPhoneVerification;
};

export type CheckPhoneVerificationMutationCheckPhoneVerification = {
  __typename?: "PhoneVerificationResponse";

  errors: Maybe<CheckPhoneVerificationMutationErrors[]>;

  success: Maybe<boolean>;
};

export type CheckPhoneVerificationMutationErrors = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type ForgotPasswordChangeMutationVariables = {
  input: ForgotPasswordChangeInput;
};

export type ForgotPasswordChangeMutationMutation = {
  __typename?: "Mutation";

  forgotPasswordChange: ForgotPasswordChangeMutationForgotPasswordChange;
};

export type ForgotPasswordChangeMutationForgotPasswordChange = {
  __typename?: "ErrorResponse";

  errors: Maybe<ForgotPasswordChangeMutationErrors[]>;
};

export type ForgotPasswordChangeMutationErrors = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type LoginMutationVariables = {
  input: LoginInput;
};

export type LoginMutationMutation = {
  __typename?: "Mutation";

  login: LoginMutationLogin;
};

export type LoginMutationLogin = {
  __typename?: "LoginResponse";

  user: Maybe<LoginMutationUser>;

  errors: Maybe<LoginMutationErrors[]>;
};

export type LoginMutationUser = UserInfoFragment;

export type LoginMutationErrors = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type LogoutMutationVariables = {};

export type LogoutMutationMutation = {
  __typename?: "Mutation";

  logout: boolean;
};

export type RegisterMutationVariables = {
  input: RegisterInput;
};

export type RegisterMutationMutation = {
  __typename?: "Mutation";

  register: RegisterMutationRegister;
};

export type RegisterMutationRegister = {
  __typename?: "ErrorResponse";

  errors: Maybe<RegisterMutationErrors[]>;
};

export type RegisterMutationErrors = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type SendForgotPasswordEmailMutationVariables = {
  email: string;
};

export type SendForgotPasswordEmailMutationMutation = {
  __typename?: "Mutation";

  sendForgotPasswordEmail: boolean;
};

export type SendPhoneVerificationMutationVariables = {
  phoneNumber: string;
};

export type SendPhoneVerificationMutationMutation = {
  __typename?: "Mutation";

  sendPhoneVerification: SendPhoneVerificationMutationSendPhoneVerification;
};

export type SendPhoneVerificationMutationSendPhoneVerification = {
  __typename?: "PhoneVerificationResponse";

  errors: Maybe<SendPhoneVerificationMutationErrors[]>;

  success: Maybe<boolean>;
};

export type SendPhoneVerificationMutationErrors = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: "Query";

  me: Maybe<MeMe>;
};

export type MeMe = UserInfoFragment;

export type UserInfoFragment = {
  __typename?: "User";

  id: string;

  username: string;

  email: string;

  userType: string;
};

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export const UserInfoFragmentDoc = gql`
  fragment UserInfo on User {
    id
    username
    email
    userType
  }
`;

// ====================================================
// Components
// ====================================================

export const CheckPhoneVerificationMutationDocument = gql`
  mutation checkPhoneVerificationMutation($code: String!) {
    checkPhoneVerification(code: $code) {
      errors {
        path
        message
      }
      success
    }
  }
`;
export class CheckPhoneVerificationMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CheckPhoneVerificationMutationMutation,
      CheckPhoneVerificationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CheckPhoneVerificationMutationMutation,
        CheckPhoneVerificationMutationVariables
      >
        mutation={CheckPhoneVerificationMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CheckPhoneVerificationMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    CheckPhoneVerificationMutationMutation,
    CheckPhoneVerificationMutationVariables
  >
> &
  TChildProps;
export type CheckPhoneVerificationMutationMutationFn = ReactApollo.MutationFn<
  CheckPhoneVerificationMutationMutation,
  CheckPhoneVerificationMutationVariables
>;
export function CheckPhoneVerificationMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CheckPhoneVerificationMutationMutation,
        CheckPhoneVerificationMutationVariables,
        CheckPhoneVerificationMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    CheckPhoneVerificationMutationMutation,
    CheckPhoneVerificationMutationVariables,
    CheckPhoneVerificationMutationProps<TChildProps>
  >(CheckPhoneVerificationMutationDocument, operationOptions);
}
export const ForgotPasswordChangeMutationDocument = gql`
  mutation forgotPasswordChangeMutation($input: ForgotPasswordChangeInput!) {
    forgotPasswordChange(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class ForgotPasswordChangeMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      ForgotPasswordChangeMutationMutation,
      ForgotPasswordChangeMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        ForgotPasswordChangeMutationMutation,
        ForgotPasswordChangeMutationVariables
      >
        mutation={ForgotPasswordChangeMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type ForgotPasswordChangeMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    ForgotPasswordChangeMutationMutation,
    ForgotPasswordChangeMutationVariables
  >
> &
  TChildProps;
export type ForgotPasswordChangeMutationMutationFn = ReactApollo.MutationFn<
  ForgotPasswordChangeMutationMutation,
  ForgotPasswordChangeMutationVariables
>;
export function ForgotPasswordChangeMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        ForgotPasswordChangeMutationMutation,
        ForgotPasswordChangeMutationVariables,
        ForgotPasswordChangeMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    ForgotPasswordChangeMutationMutation,
    ForgotPasswordChangeMutationVariables,
    ForgotPasswordChangeMutationProps<TChildProps>
  >(ForgotPasswordChangeMutationDocument, operationOptions);
}
export const LoginMutationDocument = gql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        ...UserInfo
      }
      errors {
        path
        message
      }
    }
  }

  ${UserInfoFragmentDoc}
`;
export class LoginMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<LoginMutationMutation, LoginMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutationMutation, LoginMutationVariables>
        mutation={LoginMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LoginMutationMutation, LoginMutationVariables>
> &
  TChildProps;
export type LoginMutationMutationFn = ReactApollo.MutationFn<
  LoginMutationMutation,
  LoginMutationVariables
>;
export function LoginMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutationMutation,
        LoginMutationVariables,
        LoginMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LoginMutationMutation,
    LoginMutationVariables,
    LoginMutationProps<TChildProps>
  >(LoginMutationDocument, operationOptions);
}
export const LogoutMutationDocument = gql`
  mutation LogoutMutation {
    logout
  }
`;
export class LogoutMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<LogoutMutationMutation, LogoutMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutationMutation, LogoutMutationVariables>
        mutation={LogoutMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LogoutMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutationMutation, LogoutMutationVariables>
> &
  TChildProps;
export type LogoutMutationMutationFn = ReactApollo.MutationFn<
  LogoutMutationMutation,
  LogoutMutationVariables
>;
export function LogoutMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutationMutation,
        LogoutMutationVariables,
        LogoutMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutationMutation,
    LogoutMutationVariables,
    LogoutMutationProps<TChildProps>
  >(LogoutMutationDocument, operationOptions);
}
export const RegisterMutationDocument = gql`
  mutation RegisterMutation($input: RegisterInput!) {
    register(input: $input) {
      errors {
        path
        message
      }
    }
  }
`;
export class RegisterMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RegisterMutationMutation,
      RegisterMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutationMutation, RegisterMutationVariables>
        mutation={RegisterMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutationMutation, RegisterMutationVariables>
> &
  TChildProps;
export type RegisterMutationMutationFn = ReactApollo.MutationFn<
  RegisterMutationMutation,
  RegisterMutationVariables
>;
export function RegisterMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutationMutation,
        RegisterMutationVariables,
        RegisterMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutationMutation,
    RegisterMutationVariables,
    RegisterMutationProps<TChildProps>
  >(RegisterMutationDocument, operationOptions);
}
export const SendForgotPasswordEmailMutationDocument = gql`
  mutation SendForgotPasswordEmailMutation($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;
export class SendForgotPasswordEmailMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SendForgotPasswordEmailMutationMutation,
      SendForgotPasswordEmailMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SendForgotPasswordEmailMutationMutation,
        SendForgotPasswordEmailMutationVariables
      >
        mutation={SendForgotPasswordEmailMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SendForgotPasswordEmailMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    SendForgotPasswordEmailMutationMutation,
    SendForgotPasswordEmailMutationVariables
  >
> &
  TChildProps;
export type SendForgotPasswordEmailMutationMutationFn = ReactApollo.MutationFn<
  SendForgotPasswordEmailMutationMutation,
  SendForgotPasswordEmailMutationVariables
>;
export function SendForgotPasswordEmailMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SendForgotPasswordEmailMutationMutation,
        SendForgotPasswordEmailMutationVariables,
        SendForgotPasswordEmailMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SendForgotPasswordEmailMutationMutation,
    SendForgotPasswordEmailMutationVariables,
    SendForgotPasswordEmailMutationProps<TChildProps>
  >(SendForgotPasswordEmailMutationDocument, operationOptions);
}
export const SendPhoneVerificationMutationDocument = gql`
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
export class SendPhoneVerificationMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      SendPhoneVerificationMutationMutation,
      SendPhoneVerificationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        SendPhoneVerificationMutationMutation,
        SendPhoneVerificationMutationVariables
      >
        mutation={SendPhoneVerificationMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type SendPhoneVerificationMutationProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<
    SendPhoneVerificationMutationMutation,
    SendPhoneVerificationMutationVariables
  >
> &
  TChildProps;
export type SendPhoneVerificationMutationMutationFn = ReactApollo.MutationFn<
  SendPhoneVerificationMutationMutation,
  SendPhoneVerificationMutationVariables
>;
export function SendPhoneVerificationMutationHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        SendPhoneVerificationMutationMutation,
        SendPhoneVerificationMutationVariables,
        SendPhoneVerificationMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    SendPhoneVerificationMutationMutation,
    SendPhoneVerificationMutationVariables,
    SendPhoneVerificationMutationProps<TChildProps>
  >(SendPhoneVerificationMutationDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      ...UserInfo
    }
  }

  ${UserInfoFragmentDoc}
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
