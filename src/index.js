require('dotenv').config();

require('./database');

const server = require('./graphql/index');

server
   .listen({ port: process.env.PORT || 3000 })
   .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
   });