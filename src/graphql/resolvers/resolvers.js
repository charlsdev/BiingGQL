const usuariosModels = require('../../models/Users');
const {
   matchPassword
} =  require('../../security/encryptions');

let resUser;

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
                  numBoleto: 1
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
            const resultB = await usuariosModels
               .findOne({
                  numBoleto: num
               })
               .lean();
            // console.log(resultB);

            if (resultB) {
               resUser = {
                  msg: 'Boleto encontrado...',
                  User: resultB
               };
                  
               return resUser;
            } else {
               resUser = {
                  msg: 'No se encontró ese número de boleto...',
                  User: null
               };
                  
               return resUser;
            }
         } else {
            resUser = {
               msg: 'No posees los permisos suficientes...',
               User: null
            };
               
            return resUser;
         }
      },

      searchVendedor: async (root, args) => {
         const { pass, vend } = args;

         if (await matchPassword(pass)) {
            const numBol = await usuariosModels
               .find({
                  vendedor: vend
               })
               .countDocuments();

            return `${vend} vendió ${numBol} boletos...`;
         } else {               
            return 'No posees los permisos suficientes...';
         }
      },
   },
   
   Mutation: {
      addNewBoleto: async (root, args) => {    
         const { 
            pass
         } = args;

         if (await matchPassword(pass)) {
            const {
               apellidos,
               nombres,
               telefono,
               numBoleto,
               vendedor
            } = args.data;

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
      
                  const saveUser = await registroBol.save();

                  if (saveUser) {
                     resUser = {
                        msg: 'Boleto registrado con éxito...',
                        User: saveUser
                     };
         
                     return resUser;
                  } else {
                     resUser = {
                        msg: 'No se ha podido guardar el registro...',
                        User: null
                     };
         
                     return resUser;
                  }
               } else {
                  resUser = {
                     msg: 'Número de boleto no válido...',
                     User: null
                  };
      
                  return resUser;
               }
            } else {
               resUser = {
                  msg: `Boleto ya vendido por ${searchOne.vendedor}...`,
                  User: searchOne
               };
   
               return resUser;
            }
         } else {
            resUser = {
               msg: 'No posees los permisos suficientes...',
               User: null
            };
               
            return resUser;
         }
      },

      editBoleto: async (root, args) => {    
         const { 
            pass,
            numB
         } = args;
         
         if (await matchPassword(pass)) {
            const {
               apellidos,
               nombres,
               telefono,
               numBoleto,
               vendedor
            } = args.data;

            const searchOne = await usuariosModels
               .findOne({
                  numBoleto: numB
               })
               .lean();

            if (searchOne === null) {
               resUser = {
                  msg: 'Boleto no vendido, por ello no se puede actualizar...',
                  User: null
               };

               return resUser;
            } else {
               if (numBoleto >= 0 && numBoleto <= 99) {
                  const updateB = await usuariosModels
                     .updateOne({
                        numBoleto: numB
                     }, {
                        $set: {
                           apellidos,
                           nombres,
                           telefono,
                           numBoleto,
                           vendedor
                        }
                     });

                  if (updateB.modifiedCount === 1) {
                     const updateB = await usuariosModels
                        .findOne({
                           numBoleto
                        })
                        .lean();
               
                     resUser = {
                        msg: 'Número de boleto actualizado...',
                        User: updateB
                     };
      
                     return resUser;
                  } else {
                     resUser = {
                        msg: 'No se ha podido actualizar el boleto...',
                        User: null
                     };
      
                     return resUser;
                  }
               } else {
                  resUser = {
                     msg: 'Número de boleto no válido...',
                     User: null
                  };
   
                  return resUser;
               }
            }
         } else {
            resUser = {
               msg: 'No posees los permisos suficientes...',
               User: null
            };
               
            return resUser;
         }
      },

      deleteBoleto: async (root, args) => {
         const { 
            pass,
            numB
         } = args;
         
         if (await matchPassword(pass)) {
            const searchOne = await usuariosModels
               .findOne({
                  numBoleto: numB
               })
               .lean();

            if (searchOne === null) {
               return 'Boleto no econtrado...';
            } else {
               const deleteB = await usuariosModels
                  .deleteOne({
                     numBoleto: numB
                  });

               if (deleteB.deletedCount === 1) {                     
                  return `Boleto ${numB} eliminado con éxito...`;
               } else {
                  return `No se ha podido eliminar el boleto ${numB}...`;
               }
            }
         } else {               
            return 'No posees los permisos suficientes...';
         }
      },
   }
};

module.exports = resolvers;