const router = require('express').Router();
//Requerimos el módulo Router de express. Lo almacenamos en una constante.
const EmpleadoCtrl= require('../controllers/empleado.controllers');
//Importamos un elemento ya creado.
const auth = require('../middleware/auth');
//Importamos el middleware de seguridad para CRUD.

//Asociamos cada solicitud HTTP con el correspondiente método del objeto EmpleadoCtrl.
router.get('/', auth, EmpleadoCtrl.obtener);

router.post('/', auth, EmpleadoCtrl.crear);
//agregamos el middleware como segundo parámetro

router.delete('/:id', auth, EmpleadoCtrl.eliminar);

router.put('/', auth, EmpleadoCtrl.editar);

module.exports=router; 
//Exportamos el router creado. 