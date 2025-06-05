// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = 'https://your-next-api.com/graphql'; // metti qui l'endpoint corretto

const bearerAuth = `Bearer ${process.env.DB_USER}`;

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    Authorization: bearerAuth, // se serve
  },
});
