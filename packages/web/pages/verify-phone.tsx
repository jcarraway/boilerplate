import * as React from 'react';
import { FormikProps, Formik, Form, Field } from 'formik';
import Router from 'next/router';
import { Button } from '@hwyd/ui';

import Layout from '../components/Layout';
import { CheckPhoneVerificationMutationComponent } from '../components/apollo-components';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { normalizeErrors } from '../utils/normalizeErrors';

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
              onSubmit={async (code, { setSubmitting, setErrors }) => {
                console.log('onSubmit', code);
                const response = await mutate({
                  variables: code,
                });
                console.log('response', response);
                if (
                  response &&
                  response.data &&
                  response.data.checkPhoneVerification.errors &&
                  response.data.checkPhoneVerification.errors.length
                ) {
                  setSubmitting(false);
                  return setErrors(
                    normalizeErrors(response.data.checkPhoneVerification.errors)
                  );
                } else {
                  Router.push('/');
                }
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
