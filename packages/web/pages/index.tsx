import Link from 'next/link';
import Layout from '../components/Layout';

export default () => (
  <Layout title="Home | Boilerplace">
    <h1>Hello 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <p>
      <Link href="/login">
        <a>Login</a>
      </Link>
    </p>
    <p>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </p>
  </Layout>
);
