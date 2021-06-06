const mongoose = require("mongoose");
//Require Mongoose to create the DB connection.

URI = process.env.URI;
//DB's url.

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  //Connection parameters required by Mongoose.

  .then((db) => console.log("Connected to MongoDB."))
  //Console message after the connection is done.
  .catch((err) => console.error(err));
//Handle the erry just in case it doesn't work.

module.exports = mongoose;
//Export Mongoose.
