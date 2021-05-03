const router = require('express').Router();

const usuarioModelo = require('../models/usuario.models');

const auth = require('../middleware/auth');


// Obtener todos los usuarios de la plataforma
router.get('/', auth, async (req, res) => {
    try {
        const users = await usuarioModelo.find({}, {
            email: 0,
            passwordHash: 0,
            base64: 0,
            bio: 0,
            country: 0, 
            created: 0
        });
        res.json(users);

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;

