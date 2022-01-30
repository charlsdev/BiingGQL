const { gql } = require('apollo-server');

const typeDefs = gql`
   type Query {
      boletosCount(pass: String!): String!
      allBoletos(pass: String!): [Usuarios]!
      oneBoleto(pass: String!, num: Int!): [Usuarios]!
   }

   type Mutation {
      addNewBoleto(pass: String!, data: newRegister): String!
   }

   type Usuarios {
      _id: ID!
      apellidos: String!
      nombres: String!
      telefono: String!
      numBoleto: String!
      vendedor: String!
   }

   input newRegister {
      apellidos: String!
      nombres: String!
      telefono: String!
      numBoleto: String!
      vendedor: String!
   }
`;

module.exports = typeDefs;