const router = require("express").Router();
//Require the express' router method.
const User = require("../models/usuario.models");
//Require user's model.
const bcrypt = require("bcryptjs");
//Require bcrypt to encrypt the passwords. npm i bcryptjs
const jwt = require("jsonwebtoken");
//Require JSONWebToken to handle login. There's a env var with a JWT password.

//REGISTER A USER AND GET AUTO LOGGED IN
router.post("/", async (req, res) => {
  //Define the logic for the HTTP verb and route. We could create a controller's folder and keep this there.
  try {
    const { email, password, passwordVerify, base64 } = req.body;

    if (base64) console.log(email, password);
    //Destructuring req.body, that's JSON format. Just in case, I tested it with a POSTMAN req with a body in JSON and console loggin.

    //Validation
    if (!email || !password || !passwordVerify || !base64) {
      return res.status(202).send("Fill out all the required information");
    }

    if (password.length < 6) {
      return res.status(202).send("Provide a 6 characteres password minimum.");
    }

    if (password !== passwordVerify) {
      return res
        .status(202)
        .send("Check the password is written twice to verify it.");
    }

    const usuarioExistente = await User.findOne({ email });
    //Verify if there's a user with the same email, using the user's model and the method .findOne({}).

    if (usuarioExistente) {
      return res
        .status(202)
        .send("There's already a user with the email provided.");
    }

    //Encrypting the password. Async function.
    const salt = await bcrypt.genSalt();
    //First: Create a 'salt' with the .genSalt() method.
    const passwordHash = await bcrypt.hash(password, salt);
    //Generate the passwordHash with the .hash.() method.

    //Even though I didn't use this information in the front-end, might be useful to keep it in the DB.
    const last_connection = new Date();

    const created = last_connection;

    //Store user's info in DB.
    const nuevoUsuario = new User({
      email,
      passwordHash,
      base64,
      username: email,
      bio: "",
      country: "",
      last_connection,
      created,
      //The bio and country have a default value of an empty string.
    });

    const usuarioGuardado = await nuevoUsuario.save();
    //Store user's info with .save() method. Async function.

    //Loggear al usuario
    //Para validar el loggeo del usuario, generaremos un JSON Web Token (JWT.io)
    //NOTA: se debe instalar el paquete correspondiente. npm i jsonwebtoken
    /*Información sobre el Json Web Token: Este posee 3 partes. primeraparte.segundaparte.terceraparte
        En la primera parte se habla del algoritmo y el tipo: "alg": "HS256" y tipo "typ": "JWT". Este es un estándar.
        En la segunda parte se almacena el 'payload', información del usuario a loggear.
        La tercera parte es la más importante. La firma verificada (verified signature). En ella debemos 
        pasar una contraseña que sólo el servidor va a conocer y así sólo este podrá validar el loggeo.
        */

    const token = jwt.sign(
      {
        user: usuarioGuardado._id,
        email: usuarioGuardado.email,
      },
      process.env.JWT_SECRET
    );
    //Consiguiendo el token.

    /*Después de generar este token, debemos conservarlo en el navegador a lo largo de la sesión, por
        ello se utiliza una cookie. También podría utilizarse el local storage del navegador, pero esta opción
        no se utilizar por seguridad, ya que alguien podría robar la cookie y suplatar a otro usuario. 
        En vez, utilizamos una httpOnly cookie, ya que incluso las cookies convencionales pueden ser accedidas
        corriendo un javascript en el navegador. La cookie es un string que contiene información que sólo será
        compartida por el front hacia el back y viceversa con cada solicitud y respuesta. 
        */

    // Enviar el token en una HttpOnly cookie. Ojo a la opción HttpOnly. Después se incluirán otras características en el deployment.

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    //En POSTMAN se debe ver la cookie recibida, ella mostrará la ruta '/' y el httpOnly: true. Enviamos un status de 200 OK al enviar la cookie.
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //Este post iría dirigido a otra dirección: /login, dentro de /auth.
  try {
    const { email, password } = req.body;
    //Destructuramos el cuerpo de la solicitud. Sólo habrá email y password.

    if (!email || !password) {
      //Sólo validaremos que si no hay email o ps, devolver mensaje.
      return res.status(202).send("Please fill all the required information.");
    }

    const usuarioExistente = await User.findOne({ email });
    //Almacenamos el usuario existente en una const, resultado de la búsqueda con el modelo y el email provisto
    if (!usuarioExistente) {
      return res.status(202).send("Wrong email or password.");
      //Damos un mensaje de error genérico. Estos mensajes podrían estar almacenados en un archivo aparte y ser importados.
    }

    const passwordCorrecto = await bcrypt.compare(
      password,
      usuarioExistente.passwordHash
    );
    //Almacenamos en una const el passwordCorrecto al comparar con bcrypt el password provisto y el existente en el usuario
    if (!passwordCorrecto) {
      return res.status(202).send("Wrong email or password.");
      //Damos un mensaje de error genérico.
    }

    const token = jwt.sign(
      {
        user: usuarioExistente._id,
        email: usuarioExistente.email,
      },
      process.env.JWT_SECRET
    );
    //Consiguiendo el token del usuario existente.

    // Actualizar última conexión
    const time = new Date();
    usuarioExistente.last_connection = time;
    await usuarioExistente.save();

    //Enviar el token en una HttpOnly cookie.
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//LOGOUT
router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
  //En caso de no poder eliminar la cookie, vamos a enviar otra con el mismo nombre pero vacía y
  //ya vencida, para que el navegador la elimine de inmediato. POSTMAN va a eliminar la cookie automáticamente.
});

//MOSTRAR CONDICIONALMENTE PÁGINAS, DEPENDIENDO DEL TOKEN DE LOGGEO.
router.get("/loggedIn", (req, res) => {
  //esta ruta es MUY parecida al middleware de autenticación.
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ value: false }).status(401);
    }
    //cambiamos por falsa la respuesta en formato JSON

    jwt.verify(token, process.env.JWT_SECRET);
    //No es necesario el user ni el next.

    const { payload } = jwt.decode(token, { complete: true });
    const { email } = payload;

    res.json({ email, value: true });
    // .send(true);
  } catch (error) {
    res.json({ value: false }).status(401);
  }
});

module.exports = router;
