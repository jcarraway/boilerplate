import * as React from 'react';
import { Button } from '@example/ui';

import Layout from '../components/Layout';
import { FormikProps, Form, Field, Formik } from 'formik';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { LoginMutationComponent } from '../components/apollo-components';
import { normalizeErrors } from '../utils/normalizeErrors';
import Router from 'next/router';

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
                });
                console.log(response);
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
