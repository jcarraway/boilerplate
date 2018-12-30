import * as React from 'react';
import { Button } from '@hwyd/ui';

import Layout from '../components/Layout';
import { FormikProps, Form, Field, Formik } from 'formik';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { SendForgotPasswordEmailMutationComponent } from '../components/apollo-components';
import Router from 'next/router';
import Link from 'next/link';

interface FormValues {
  email: string;
}

const initialValues = { email: '' };

export default class ForgotPassword extends React.PureComponent<
  FormikProps<FormValues>
> {
  render() {
    return (
      <Layout title="Forgot Password | Boilerplate">
        <SendForgotPasswordEmailMutationComponent>
          {mutate => (
            <Formik<FormValues>
              initialValues={initialValues}
              onSubmit={async (email, { setSubmitting }) => {
                console.log('onSubmit', email);
                const response = await mutate({
                  variables: email,
                });
                console.log(response);
                setSubmitting(false);
                Router.push('/');
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div style={{ width: 400, margin: 'auto' }}>
                    <Field
                      name="email"
                      component={FormikInput}
                      placeholder="Email"
                      type="email"
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Send Password Reset Link
                    </Button>
                    <p>
                      <Link prefetch href="/register">
                        <a>Register</a>
                      </Link>
                    </p>
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
        </SendForgotPasswordEmailMutationComponent>
      </Layout>
    );
  }
}
