const mongoose = require('mongoose');

const mongoDB = process.env.mongoDB;

mongoose.connect(mongoDB, {
   useUnifiedTopology: true,
   useNewUrlParser: true
})
   .then((db) =>
      console.log(`DB is connect to ${db.connection.host} - ${db.connection.name}...`)
   )
   .catch((err) =>
      console.log(err)
   );