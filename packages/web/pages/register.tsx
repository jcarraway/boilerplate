import * as React from 'react';
import { Button } from '@example/ui';
import { registerSchema } from '@example/common';

import Layout from '../components/Layout';
import { FormikProps, Form, Field, Formik } from 'formik';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { RegisterMutationComponent } from '../components/apollo-components';
import { normalizeErrors } from '../utils/normalizeErrors';
import Router from 'next/router';

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const initialValues = { email: '', username: '', password: '' };

export default class Register extends React.PureComponent<
  FormikProps<FormValues>
> {
  render() {
    return (
      <Layout title="Register">
        <RegisterMutationComponent>
          {mutate => (
            <Formik<FormValues>
              initialValues={initialValues}
              onSubmit={async (input, { setSubmitting, setErrors }) => {
                const response = await mutate({
                  variables: {
                    input,
                  },
                });
                if (
                  response &&
                  response.data &&
                  response.data.register.errors &&
                  response.data.register.errors.length
                ) {
                  setSubmitting(false);
                  return setErrors(
                    normalizeErrors(response.data.register.errors)
                  );
                } else {
                  Router.push('/');
                }
              }}
              validationSchema={registerSchema}
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
                    <Field
                      name="username"
                      component={FormikInput}
                      placeholder="Username"
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
                      Register
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </RegisterMutationComponent>
      </Layout>
    );
  }
}
