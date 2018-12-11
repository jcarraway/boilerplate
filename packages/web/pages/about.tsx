import Link from 'next/link'
import Layout from '../components/Layout';

export default () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p><Link href='/'><a>Home</a></Link></p>
  </Layout>
)