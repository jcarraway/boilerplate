import * as React from 'react';
import { Button } from '@example/ui';

import Layout from '../components/Layout';
// import { FormikInput } from '../components/formik-fields/FormikInput';

export default class Register extends React.PureComponent {
  render() {
    return (
      <Layout title="Register">
        <Button variant={'primary'}>Register</Button>
      </Layout>
    );
  }
}
