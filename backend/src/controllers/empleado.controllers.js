const EmpleadoCtrl = {};
//Este objeto vacío representa el controlador para las solicitudes a realizarse por la dirección /api.
const EmpleadoModelo = require('../models/empleado.models');
//Almacenamos lo exportado en el archivo .prueba.models que contiene el modelo del dato empleado.

EmpleadoCtrl.obtener = async (req, res) => {
    //En este controlador estamos definiendo qué hacer frente al método GET. Utilizamos el modelo del empleado con el método find para buscar todos los empleados contenidos en la db. 
    //Si se quisiese encontrar un empleado específico se escribiría en el primer parámetro {} se utilizarían queries de mongodb: https://docs.mongodb.com/manual/reference/operator/query/. Para mas info: https://thecodebarbarian.com/how-find-works-in-mongoose.html
    try {
        const empleados = await EmpleadoModelo.find();
        res.json(empleados);
    
    } catch (error) {
        console.error(err);
        res.status(500).send();        
    }
}

EmpleadoCtrl.crear = async (req, res) => {
    //En este controlador estamos definiendo qué se haría en el método POST. 

    const nombreInput = req.body.nombre;
    const apellidoInput = req.body.apellido;
    const salarioInput = req.body.salario;
    //En el cuerpo de la solicitud, que está en formato JSON y hemos permitido interpretar gracias al express.json usado en index.js,...
    //...vamos a encontrar tres keys (nombre, apellido, salario). Almacenamos cada valor en una const.

    const nuevoEmpleado = new EmpleadoModelo({
        nombre: nombreInput,
        apellido: apellidoInput,
        salario: salarioInput
    });
    //Utilizando el modelo de empleado, almacenamos en una const el nuevo empleado con las const definidas arriba.
    try {
        //Usamos un async await para esperar que se guarde el nuevoEmpleado dentro de una estructura try catch.
        await nuevoEmpleado.save();
        res.json(nuevoEmpleado);  
    } catch (err) {
        console.log(err);
        res.status(500).send();
    }
}

EmpleadoCtrl.eliminar = async (req, res) => {
    //Definimos las solicitudes DELETE.
    const id = req.params.id;
    //Tomamos el id que es pasado como un parámetro en la solicitud HTTP.
    await EmpleadoModelo.findByIdAndRemove(id).exec();
    //Esperamos a que, utilizando el modelo empleado, encontremos y eliminemos el registro gracias a su id.
    res.send('Borrado');
    //Enviamos respuesta.
}

EmpleadoCtrl.editar = async (req, res) => {
    //Definimos respuesta a solicitud PUT, donde se actualizará el salario.  
    const nuevoSalario = req.body.nuevoSalario;
    const id = req.body.id;
    //Almacenamos el nuevoSalario y el id, pasados en el cuerpo de la solicitud en estructura JSON gracias a Axios desde el front. 

    try {
        //En un try catch usamos el modelo de empleado para buscar por id el empleado a actualizar. Función asíncrona.
        await EmpleadoModelo.findById(id, (err, empleadoActualizado) => {
            empleadoActualizado.salario = nuevoSalario;
            empleadoActualizado.save();
            res.send('Actualizado');
        })

    } catch (err) {
        console.log(err);
    }
}

module.exports = EmpleadoCtrl;
//Exportamos el objeto EmpleadoCtrl con sus métodos ya definidos. 