import React from 'react';
import Head from 'next/head';
import cookie from 'cookie';
import PropTypes from 'prop-types';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import { getDataFromTree } from 'react-apollo';

import initApollo from './init-apollo';
import { isBrowser } from './isBrowser';
import { MeQuery } from '../components/apollo-components';
import { meQuery } from '../graphql/user/queries/me.query';

function parseCookies(req?: any, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  );
}

const SERVER_LINK_OPTIONS = {
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
};

export default (App: any) => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`;
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    };

    static async getInitialProps(ctx: any) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(
        SERVER_LINK_OPTIONS,
        {},
        {
          getToken: () => parseCookies(req).xid,
        }
      );

      const query = await apollo.query<MeQuery>({
        query: meQuery,
      });

      console.log('meQuery', query);

      const {
        data: { me },
      } = await apollo.query<MeQuery>({
        query: meQuery,
      });

      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // when redirecting, the response is finished.
        // no point in continuing to render
        return {};
      }

      if (!isBrowser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        me,
        apolloState,
      };
    }

    apolloClient: ApolloClient<NormalizedCacheObject>;

    constructor(props: any) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient = initApollo(SERVER_LINK_OPTIONS, props.apolloState, {
        getToken: () => {
          return parseCookies().xid;
        },
      });
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
