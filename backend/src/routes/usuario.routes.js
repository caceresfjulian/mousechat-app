const router = require("express").Router();
//requerimos la funcion router de express.
const User = require("../models/usuario.models");
//Almacenamos en una constante el modelo de usuario.
const bcrypt = require("bcryptjs");
//Requerimos el bcrypt para encriptar.
const jwt = require("jsonwebtoken");
//Requerimos JSONWebToken para manejar el loggeo de usuarios. Recuerda crear una variable de entorno con...
//...una contraseña para jwt.

//NOTA: Para encriptar (hash) las contraseñas (passwordHash) se utilizará el paquete BCrypt.
//Este debe ser instalado usando el comando npm i bcryptjs

//REGISTRO DE USUARIO CON LOGGEO AUTOMÁTICO
router.post("/", async (req, res) => {
  //Definimos directamente, sin controlador,  qué se hará en caso de post. Esto podría ser puesto en...
  //...la carpeta controllers para mayor modularidad.
  try {
    const { email, password, passwordVerify, base64 } = req.body;

    if (base64) console.log(email, password);
    //Desestructuración del cuerpo de la solicitud que será enviada en formato JSON. (Esto lo probamos
    //...enviando una solicitud desde POSTMAN con cuerpo en formato JSON y haciendo console.log).

    //validación
    if (!email || !password || !passwordVerify || !base64) {
      //Si no hay email o ps o psv, devolver mensaje.
      return res.status(400).json({
        mensajeError: "Por favor ingrese todos los datos requeridos.",
      });
    }

    if (password.length < 6) {
      //Si la contraseña no cumple con una extensión, devolver mensaje.
      return res.status(400).json({
        mensajeError:
          "Por favor ingrese una contraseña de mínimo 6 caracteres.",
      });
    }

    if (password !== passwordVerify) {
      //Si la contraseña no coincide con su verificación, devolver mensaje.
      return res.status(400).json({
        mensajeError: "Por favor ingrese la misma contraseña dos veces.",
      });
    }

    const usuarioExistente = await User.findOne({ email });
    //Vamos a verificar si existe un usuario con el mismo correo gracias al modelo de usuario y el...
    //...método .findOne({}) al que le pasamos el correo, significando email:email.

    if (usuarioExistente) {
      //si el usuario existe con ese correo, devolver mensaje.
      return res.status(400).json({
        mensajeError: "Una cuenta con dicho correo ya existe.",
      });
    }

    //Aquí vamos a encriptar las contraseñas.
    //NOTA: Estas funciones son ASÍNCRONAS, es decir, se requiere el AWAIT la creación de cada const.
    const salt = await bcrypt.genSalt();
    //Se crea algo llamado 'salt'. No sé para qué sirve, pero se necesita.
    const passwordHash = await bcrypt.hash(password, salt);
    //Aquí se almacena en una constante la contraseña encriptada gracias al método .hash.

    const last_connection = new Date();

    const created = last_connection;
    // Generar fecha de conexión

    //Guardar usuario y contraseña encriptada en la base de datos.

    const nuevoUsuario = new User({
      email,
      passwordHash,
      base64,
      username: email,
      bio: "",
      country: "",
      last_connection,
      created,
      //Solo se pone email y passwordHash, ya que ellos han sido previamente definidos.
    });

    const usuarioGuardado = await nuevoUsuario.save();
    //Utilizamos el modelo con el método save. Funcion asíncrona.

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
      return res.status(400).json({
        mensajeError: "Por favor ingrese todos los datos requeridos.",
      });
    }

    const usuarioExistente = await User.findOne({ email });
    //Almacenamos el usuario existente en una const, resultado de la búsqueda con el modelo y el email provisto
    if (!usuarioExistente) {
      return res
        .status(401)
        .json({ mensajeError: "Email o contraseña incorrectos." });
      //Damos un mensaje de error genérico. Estos mensajes podrían estar almacenados en un archivo aparte y ser importados.
    }

    const passwordCorrecto = await bcrypt.compare(
      password,
      usuarioExistente.passwordHash
    );
    //Almacenamos en una const el passwordCorrecto al comparar con bcrypt el password provisto y el existente en el usuario
    if (!passwordCorrecto) {
      return res
        .status(401)
        .json({ mensajeError: "Email o constraseña incorrectos." });
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
