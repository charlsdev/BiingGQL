const { gql } = require('apollo-server');

const typeDefs = gql`
   type Query {
      boletosCount(pass: String!): String!
      allBoletos(pass: String!): [Usuarios]!
      oneBoleto(pass: String!, num: Int!): resUser!
      searchVendedor(pass: String!, vend: Vendedores!): String!
   }

   type Mutation {
      addNewBoleto(pass: String!, data: inputUsers): resUser!
      editBoleto(pass: String!, numB: Int!, data: inputUsers!): resUser!
      deleteBoleto(pass: String!, numB: Int!): String!
   }

   type Usuarios {
      _id: ID
      apellidos: String
      nombres: String
      telefono: String
      numBoleto: String
      vendedor: String
   }

   type resUser {
      msg: String!
      User: Usuarios
   }

   input inputUsers {
      apellidos: String!
      nombres: String!
      telefono: String!
      numBoleto: String!
      vendedor: Vendedores!
   }

   enum Vendedores {
      CarlosVP
      NicolM
      RashelM
      ElizaCH
      DavidV
      SebastianN
      XiomaraBP
      VictorFC
      MaferL
   }
`;

module.exports = typeDefs;