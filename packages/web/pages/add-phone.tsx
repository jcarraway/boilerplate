import * as React from 'react';
import { FormikProps, Formik, Form, Field } from 'formik';
import Layout from '../components/Layout';
import { SendPhoneVerificationMutationComponent } from '../components/apollo-components';
import Router from 'next/router';
import { FormikInput } from '../components/formik-fields/FormikInput';
import { Button } from '@example/ui';

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
              onSubmit={async (phoneNumber, { setSubmitting }) => {
                console.log('onSubmit', phoneNumber);
                const response = await mutate({
                  variables: phoneNumber,
                });
                console.log(response);
                setSubmitting(false);
                Router.push('/verify-phone');
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
