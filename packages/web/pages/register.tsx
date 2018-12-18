import * as React from 'react';
import { Button } from '@example/ui';
import { registerSchema } from '@example/common';

import Layout from '../components/Layout';
import { FormikProps, Form, Field, Formik } from 'formik';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { RegisterMutationComponent } from '../components/apollo-components';

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
            <Formik
              initialValues={initialValues}
              onSubmit={async (
                values: FormValues,
                { resetForm, setSubmitting }
              ) => {
                await mutate({
                  variables: {
                    input: {
                      email: values.email,
                      username: values.password,
                      password: values.password,
                      userType: 'user',
                    },
                  },
                });
                setSubmitting(false);
                resetForm();
                console.log(values);
              }}
              validationSchema={registerSchema}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div style={{ width: 400, margin: 'auto' }}>
                    <Field
                      name="email"
                      component={FormikInput}
                      placeholder="Email"
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
