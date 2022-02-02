const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers/resolvers');
const {
   ApolloServerPluginLandingPageGraphQLPlayground, 
   // ApolloServerPluginLandingPageDisabled
} = require('apollo-server-core');

const server = new ApolloServer({
   typeDefs,
   resolvers,
   plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
      // ApolloServerPluginLandingPageDisabled
   ],
   // context: ({ req, res }) => ({
   //    req, res
   // }),
   introspection: true,
});

module.exports = server;