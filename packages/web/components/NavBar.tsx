import * as React from 'react';
import { Link, Text, Flex } from 'rebass';
import NextLink from 'next/link';
import get from 'lodash.get';
import { Button } from '@example/ui';
import Router from 'next/router';
import styled from 'styled-components';
// import { Menu, Dropdown } from 'antd';

import { MeComponent, LogoutMutationComponent } from './apollo-components';

const Container = styled(Flex)`
  flex: 0 0 auto;
`;

export const NavBar = () => {
  return (
    <Container my="1.5rem" justifyContent="space-between">
      <Flex alignItems="center">
        <NextLink passHref href="/">
          <Link fontSize={5} color="primary.1">
            <Text fontFamily="rubik">Example 🤠</Text>
          </Link>
        </NextLink>
      </Flex>

      <MeComponent>
        {({ data, loading }) => {
          if (loading) {
            return null;
          }

          let isLoggedIn = !!get(data, 'me', false);

          console.log('isloggedin', isLoggedIn);

          if (isLoggedIn) {
            return (
              <Flex>
                <Button
                  variant="primary"
                  onClick={() => Router.push('/account')}
                >
                  {data!.me!.username || 'Account'}
                </Button>
                <LogoutMutationComponent>
                  {(mutate, { client }) => (
                    <Button
                      variant="primary"
                      onClick={async () => {
                        await mutate({});
                        await client.resetStore();
                        Router.push('/');
                        location.reload(true);
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </LogoutMutationComponent>
              </Flex>
            );
          }

          return (
            <a href="/login">
              <Button variant="primary">Sign in</Button>
            </a>
          );
        }}
      </MeComponent>
    </Container>
  );
};
