const usuariosModels = require('../../models/Users');
const {
   matchPassword
} =  require('../../security/encryptions');

const resolvers = {
   Query: {
      boletosCount: async (root, args) => {    
         const { pass } = args;

         if (await matchPassword(pass)) {
            const result = await usuariosModels
               .find()
               .countDocuments();

            return `Boletos vendidos ==> ${result}`;
         } else {
            return 'No posees permisos suficientes...';
         }
      },

      allBoletos: async (root, args) => {    
         const { pass } = args;

         if (await matchPassword(pass)) {
            const result = await usuariosModels
               .find()
               .lean()
               .sort({
                  createdAt: 'desc'
               })
               .exec();

            return result;
         } else {
            return [];
         }
      },

      oneBoleto: async (root, args) => {
         const { pass, num } = args;

         if (await matchPassword(pass)) {
            const result = await usuariosModels
               .find({
                  numBoleto: num
               })
               .lean();

            return result;
         } else {
            return [];
         }
      },
   },
   
   Mutation: {
      addNewBoleto: async (root, args) => {    
         const { 
            pass
         } = args;

         const {
            apellidos,
            nombres,
            telefono,
            numBoleto,
            vendedor
         } = args.data;

         if (await matchPassword(pass)) {
            const searchOne = await usuariosModels
               .findOne({
                  numBoleto
               })
               .exec();

            if (!searchOne) {
               if (numBoleto >= 0 && numBoleto <= 99) {
                  const registroBol = new usuariosModels({
                     apellidos,
                     nombres,
                     telefono,
                     numBoleto,
                     vendedor
                  });
      
                  await registroBol.save();
      
                  return 'Boleto registrado con éxito...';
               } else {
                  return 'Número de boleto no válido...';
               }
            } else {
               return `Boleto ya vendido por ${searchOne.vendedor}...`;
            }
         } else {
            return 'No se ha podido registrar el boleto...';
         }
      },
   }
};

module.exports = resolvers;