import { LogoutMutationComponent, MeComponent } from './apollo-components';
import Router from 'next/router';

export const Logout: React.SFC = () => (
  <LogoutMutationComponent>
    {(mutate, { client }) => (
      <MeComponent>
        {({ data, loading }) => {
          console.log('data logout component', data);
          // const isLoggedIn = !!data!.me;

          if (loading) {
            return <div>Loading...</div>;
          }
          // if (isLoggedIn) {
          return (
            <div>
              <div>
                <button
                  onClick={async () => {
                    await mutate({});
                    await client.resetStore();
                    Router.push('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          );
          // }
          // return <button>Login</button>;
        }}
      </MeComponent>
    )}
  </LogoutMutationComponent>
);
