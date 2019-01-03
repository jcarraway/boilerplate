import * as React from 'react';
import Head from 'next/head';
import { Wrapper } from '@example/ui';

import { NavBar } from './NavBar';
// import { LogoutMutationComponent } from './apollo-components';
// import Router from 'next/router';

type Props = {
  title: string;
};

const Layout: React.SFC<Props> = ({ children, title }) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Wrapper>
      <NavBar />
      {children}
    </Wrapper>
  </div>
);

export default Layout;
