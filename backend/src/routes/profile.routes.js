const router = require("express").Router();

const auth = require("../middleware/auth");

const usuarioModelo = require("../models/usuario.models");

//Get the user's profile info
router.get("/", auth, async (req, res) => {
  try {
    const profile = await usuarioModelo.findOne({ _id: req.user });
    res.status(200).json(profile);
  } catch (error) {
    console.log(error);
  }
});

//Update the new profile's info
router.post("/", auth, async (req, res) => {
  const newValue = req.body.newValue;
  const edit = req.body.edit;
  const email = req.body.email;

  try {
    const usuarioActualizado = await usuarioModelo.findOne({ email });
    usuarioActualizado[edit] = newValue;
    usuarioActualizado.save();
    res.send("Actualizado");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
