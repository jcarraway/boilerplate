import Link from 'next/link';
import Layout from '../components/Layout';

export default () => (
  <Layout title="Home | Boilerplate">
    <h1>Hello 👋</h1>
    <p>
      <Link prefetch href="/about">
        <a>About</a>
      </Link>
    </p>
    <p>
      <Link prefetch href="/login">
        <a>Login</a>
      </Link>
    </p>
    <p>
      <Link prefetch href="/register">
        <a>Register</a>
      </Link>
    </p>
  </Layout>
);
