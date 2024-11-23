import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import resolvers from './resolver.js';
import TrackAPI from './datasources/track-api.js';
import typeDefs from './schema.js';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    context: async () => {
      // Use Apollo Client to interact with Dgraph from the server side
      const client = new ApolloClient({
        uri: import.meta.env.VITE_DGRAPH_ENDPOINT,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_DGRAPH_API_KEY}`,
        },
        cache: new InMemoryCache(),
      });

      return {
        dataSources: {
          trackAPI: new TrackAPI({ client }),
        },
      };
    },
  });

  console.log(`Server is running! Query at ${url}`);
}

startApolloServer();