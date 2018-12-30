import * as React from 'react';
import { FormikProps, Form, Field, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from '@hwyd/ui';
import { changePasswordSchema } from '@hwyd/common';

import Layout from '../components/Layout';
import { ForgotPasswordChangeMutationComponent } from '../components/apollo-components';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { normalizeErrors } from '../utils/normalizeErrors';

interface Props {
  token: string;
}

interface FormValues {
  newPassword: string;
}

const initialValues = { newPassword: '' };

export default class ChangePassword extends React.Component<
  FormikProps<FormValues> & Props
> {
  static async getInitialProps({ query }: any) {
    const token = query.token;

    if (!token) {
      return;
    }

    return { token };
  }

  render() {
    const { token } = this.props;
    return (
      <Layout title="Change Password">
        <ForgotPasswordChangeMutationComponent>
          {mutate => (
            <Formik<FormValues>
              initialValues={initialValues}
              onSubmit={async (input, { setSubmitting, setErrors }) => {
                const response = await mutate({
                  variables: {
                    input: {
                      newPassword: input.newPassword,
                      token,
                    },
                  },
                });
                if (
                  response &&
                  response.data &&
                  response.data.forgotPasswordChange.errors &&
                  response.data.forgotPasswordChange.errors.length
                ) {
                  setSubmitting(false);
                  return setErrors(
                    normalizeErrors(response.data.forgotPasswordChange.errors)
                  );
                } else {
                  Router.push('/login');
                }
              }}
              validationSchema={changePasswordSchema}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div style={{ width: 400, margin: 'auto' }}>
                    <Field
                      name="newPassword"
                      component={FormikInput}
                      placeholder="Password"
                      type="password"
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Change Password
                    </Button>
                    <p>
                      <Link prefetch href="/login">
                        <a>Login</a>
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </ForgotPasswordChangeMutationComponent>
      </Layout>
    );
  }
}

// export default class Change extends React.Component<Props> {
//   static async getInitialProps({ query }: any) {
//     console.log('get init props called');
//     const token = query.token;
//     console.log('key', token);

//     if (!token) {
//       console.log('you suck');
//     }

//     return { token };
//   }

//   render() {
//     const { token } = this.props;
//     console.log('token', token);

//     if (!token) return <h1>Token not found</h1>;

//     return <h1>{token}</h1>;
//   }
// }
