const mongoose = require("mongoose");
//Require Mongoose to create the user's model and schema.

const usuarioSchema = new mongoose.Schema({
  //Define user's DB schemma.
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  base64: { data: Buffer, type: String, required: true },
  username: { type: String, required: true },
  bio: { type: String, required: false },
  country: { type: String, required: false },
  last_connection: { type: Date, required: true },
  created: { type: Date, required: true },
});

const User = mongoose.model("usuario", usuarioSchema);
//Create the user's model.

module.exports = User;
//Export the user's model.
