import * as React from 'react';
import { Button } from '@hwyd/ui';

import Layout from '../components/Layout';
import { FormikProps, Form, Field, Formik } from 'formik';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { LoginMutationComponent } from '../components/apollo-components';
import { normalizeErrors } from '../utils/normalizeErrors';
import Router from 'next/router';
import { meQuery } from '../graphql/user/queries/me.query';
import Link from 'next/link';

interface FormValues {
  usernameOrEmail: string;
  password: string;
}

const initialValues = { usernameOrEmail: '', password: '' };

export default class Login extends React.PureComponent<
  FormikProps<FormValues>
> {
  render() {
    return (
      <Layout title="Login | Boilerplate">
        <LoginMutationComponent>
          {mutate => (
            <Formik<FormValues>
              initialValues={initialValues}
              onSubmit={async (input, { setSubmitting, setErrors }) => {
                console.log('onSubmit', input);
                const response = await mutate({
                  variables: {
                    input,
                  },
                  update: (store, { data }) => {
                    if (!data || !data.login.user) {
                      return;
                    }

                    store.writeQuery({
                      query: meQuery,
                      data: {
                        me: data.login.user,
                      },
                    });
                  },
                });
                console.log('login response', response);
                if (
                  response &&
                  response.data &&
                  response.data.login.errors &&
                  response.data.login.errors.length
                ) {
                  setSubmitting(false);
                  return setErrors(normalizeErrors(response.data.login.errors));
                } else {
                  Router.push('/');
                }
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div style={{ width: 400, margin: 'auto' }}>
                    <Field
                      name="usernameOrEmail"
                      component={FormikInput}
                      placeholder="Username or Email"
                    />
                    <Field
                      name="password"
                      component={FormikInput}
                      placeholder="Password"
                      type="password"
                    />

                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>
                    <p>
                      <Link prefetch href="/register">
                        <a>Register</a>
                      </Link>
                    </p>
                    <p>
                      <Link prefetch href="/forgot-password">
                        <a>Forgot Password?</a>
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </LoginMutationComponent>
      </Layout>
    );
  }
}
