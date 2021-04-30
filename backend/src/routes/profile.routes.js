const router = require('express').Router();

const auth = require('../middleware/auth');

const usuarioModelo = require('../models/usuario.models')

//Cargar perfil de usuario
router.get('/', auth, async (req, res) => {
    try {
        const profile = await usuarioModelo.findOne({ _id: req.user });
        res.status(200)
            .json(profile)            ;
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;