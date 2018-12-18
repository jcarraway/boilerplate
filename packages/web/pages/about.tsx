import Link from 'next/link';
import { Button } from '@example/ui';

import Layout from '../components/Layout';

export default () => (
  <Layout title="About | Boilerplate">
    <h1>Hello 👋</h1>
    <p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </p>
    <Button variant={'primary'}>Hello</Button>
  </Layout>
);
