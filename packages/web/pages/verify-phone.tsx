import * as React from 'react';
import { FormikProps, Formik, Form, Field } from 'formik';
import Layout from '../components/Layout';
import { CheckPhoneVerificationMutationComponent } from '../components/apollo-components';
import Router from 'next/router';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { Button } from '@example/ui';

interface FormValues {
  code: string;
}

const initialValues = { code: '' };

export default class VerifyPhone extends React.PureComponent<
  FormikProps<FormValues>
> {
  render() {
    return (
      <Layout title="Verify Phone Number | Boilerplate">
        <CheckPhoneVerificationMutationComponent>
          {mutate => (
            <Formik
              initialValues={initialValues}
              onSubmit={async (code, { setSubmitting }) => {
                console.log('onSubmit', code);
                const response = await mutate({
                  variables: code,
                });
                console.log(response);
                setSubmitting(false);
                Router.push('/');
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div style={{ width: 400, margin: 'auto' }}>
                    <Field
                      name="code"
                      component={FormikInput}
                      placeholder="Verification Code"
                      type="text"
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit Verification Code
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </CheckPhoneVerificationMutationComponent>
      </Layout>
    );
  }
}
