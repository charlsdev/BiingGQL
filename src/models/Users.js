const { Schema, model } = require('mongoose');

const UsuariosSchema = new Schema({
   apellidos: {
      type: String,
      required: true
   },
   nombres: {
      type: String,
      required: true
   },
   telefono: {
      type: String,
      required: true
   },
   numBoleto: {
      type: String,
      required: true
   },
   vendedor: {
      type: String,
      required: true
   }
}, {
   timestamps: true,
   versionKey: false
});

module.exports = model('Usuarios', UsuariosSchema);