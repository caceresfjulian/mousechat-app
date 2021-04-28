const mongoose = require('mongoose');
//Requerimos a mongoose para utilizar su función Schema y definir el modelo de dato que vamos a almacenar.

var empleadoSchema = new mongoose.Schema({
    //Definimos el esquema del dato empleado con la expresión new mongoose.Schema({})
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    salario:  {
        type: Number,
        required: true
    }
});

const Empleado = mongoose.model("Empleado", empleadoSchema);
//Creamos un modelo almacenado en la constante Empleado con el método model de mongoose, usando la info dada en el esquema.

//Esta era una prueba para verificar la conexión a la db, de forma que debíamos ver el siguiente registro en la db.
/*
Empleado.create({
    nombre: "Julian",
    apellido: "Caceres",
    salario: 150000
}, function (err, empleado){
    if(err){
        console.log(err)
    }else{
        console.log('Empleado registrado')
    }
});
*/
module.exports= Empleado;
//Exportamos el empleado modelo.