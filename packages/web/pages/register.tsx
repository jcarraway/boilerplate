import * as React from 'react';
import { FormikProps, Form, Field, Formik } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import { Button } from '@hwyd/ui';
import { registerSchema } from '@hwyd/common';

import Layout from '../components/Layout';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { RegisterMutationComponent } from '../components/apollo-components';
import { normalizeErrors } from '../utils/normalizeErrors';
import { meQuery } from '../graphql/user/queries/me.query';

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
      <Layout title="Register | Boilerplate">
        <RegisterMutationComponent>
          {mutate => (
            <Formik<FormValues>
              initialValues={initialValues}
              onSubmit={async (input, { setSubmitting, setErrors }) => {
                const response = await mutate({
                  variables: {
                    input,
                  },
                  update: (store, { data }) => {
                    if (!data || !data.register.user) {
                      return;
                    }

                    store.writeQuery({
                      query: meQuery,
                      data: {
                        me: data.register.user,
                      },
                    });
                  },
                });
                console.log('register response: ', response);
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
                  console.log('wtf');
                  Router.push('/add-phone');
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
        </RegisterMutationComponent>
      </Layout>
    );
  }
}
