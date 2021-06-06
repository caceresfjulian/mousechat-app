const mongoose = require("mongoose");
//Importamos mongoose para crear la conexión a la base de datos y administrarla.

URI = process.env.URI;
//Esta es la dirección de la base de datos. En caso de haberla creado en la nube, esta dirección debe cambiar.

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  //Opciones de conexión a la base de datos requeridas por mongoose.

  .then((db) => console.log("Connected to MongoDB."))
  //Aquí se resuelve la promesa de .connect con un .then, donde el evento es la respuesta de la db.
  .catch((err) => console.error(err));
//Aquí se controla el error para que sea mostrado por consola.

module.exports = mongoose;
//Exportamos mongoose.
