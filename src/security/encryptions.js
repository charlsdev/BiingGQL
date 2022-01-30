const bcrypt = require('bcryptjs');

const matchPassword = async (password) => {
   try {
      return await bcrypt.compare(password, process.env.savedPassword);
   } catch (e) {
      console.log(e);
   }
};

module.exports = {
   matchPassword
};