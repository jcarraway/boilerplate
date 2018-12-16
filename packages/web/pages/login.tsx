import * as React from 'react';
import { Button } from '@example/ui';

import Layout from '../components/Layout';
// import { FormikInput } from '../components/formik-fields/FormikInput';

export default class Login extends React.PureComponent {
  render() {
    return (
      <Layout title="Login">
        <Button variant={'primary'}>Login</Button>
      </Layout>
    );
  }
}
