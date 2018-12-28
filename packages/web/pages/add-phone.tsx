import * as React from 'react';
import { FormikProps, Formik, Form, Field } from 'formik';
import Router from 'next/router';
import { Button } from '@example/ui';
import { addPhoneSchema } from '@example/common';

import Layout from '../components/Layout';
import { SendPhoneVerificationMutationComponent } from '../components/apollo-components';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { normalizeErrors } from '../utils/normalizeErrors';

interface FormValues {
  phoneNumber: string;
}

const initialValues = { phoneNumber: '' };

export default class AddPhone extends React.PureComponent<
  FormikProps<FormValues>
> {
  render() {
    return (
      <Layout title="Add Phone Number | Boilerplate">
        <SendPhoneVerificationMutationComponent>
          {mutate => (
            <Formik
              initialValues={initialValues}
              validationSchema={addPhoneSchema}
              validateOnBlur={false}
              validateOnChange={false}
              onSubmit={async (phoneNumber, { setSubmitting, setErrors }) => {
                console.log('onSubmit', phoneNumber);
                const response = await mutate({
                  variables: phoneNumber,
                });
                console.log(response);
                if (
                  response &&
                  response.data &&
                  response.data.sendPhoneVerification.errors &&
                  response.data.sendPhoneVerification.errors.length
                ) {
                  setSubmitting(false);
                  return setErrors(
                    normalizeErrors(response.data.sendPhoneVerification.errors)
                  );
                } else {
                  Router.push('/verify-phone');
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div style={{ width: 400, margin: 'auto' }}>
                    <Field
                      name="phoneNumber"
                      component={FormikInput}
                      placeholder="Phone Number"
                      type="tel"
                    />
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Send Confirmation Code
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </SendPhoneVerificationMutationComponent>
      </Layout>
    );
  }
}
