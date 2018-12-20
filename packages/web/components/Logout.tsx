import { LogoutMutationComponent, MeQueryComponent } from './apollo-components';
import Router from 'next/router';

export const Logout: React.SFC = () => (
  <LogoutMutationComponent>
    {(mutate, { client }) => (
      <MeQueryComponent>
        {({ data, loading }) => {
          const isLoggedIn = !!data!.me;

          if (loading) {
            return <div>Loading...</div>;
          }
          if (isLoggedIn) {
            return (
              <button
                onClick={async () => {
                  await mutate({});
                  await client.resetStore();
                  Router.push('/');
                }}
              >
                Logout
              </button>
            );
          }
          return <button>Login</button>;
        }}
      </MeQueryComponent>
    )}
  </LogoutMutationComponent>
);
