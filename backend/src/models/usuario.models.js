const mongoose = require("mongoose");
//requerimos mongoose para crear el esquema y el modelo de usuario.

const usuarioSchema = new mongoose.Schema({
  //definimos las características de los usuarios, de la forma que serán almacenados en la db.
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
//creamos el modelo de usuario.

module.exports = User;
//Exportamos el modelo de usuario.
