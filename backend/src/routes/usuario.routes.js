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
      return res.status(202).send("Fill out all the required information.");
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

    //Login the user
    //Generate a JSON Web Token (JWT.io)  "npm i jsonwebtoken".
    /*Extra info about JWT: It has 3 parts in the following structure: firstpart.secondpart.thirdpart
    First part: Algorithm and type: "alg": "HS256". "typ": "JWT". It's standard.
    Second part: Payload. User's information.
    Third part: It's the most important. verified signature. It's a pw known only by the 
    server in order to validate the token. 
    */

    const token = jwt.sign(
      {
        user: usuarioGuardado._id,
        email: usuarioGuardado.email,
      },
      process.env.JWT_SECRET
    );
    //Get the token and keep it in a cookie to use it along the sesh. I'ts better than the local storage for security reasons.
    //It's an httpOnly cookie. It's more secure. This cookie has a string with all the info shared from fron to back.

    // Send the token in a HTTPonly cookie. During the deployment, this will have other features.

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    //Check it with POSTMAN. See the cookie with the route '/' and the httpOnly: true. Send 200ok status.
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      //Validation
      return res.status(202).send("Please fill all the required information.");
    }

    const usuarioExistente = await User.findOne({ email });

    // If there's no account with that email, error.
    if (!usuarioExistente) {
      return res.status(202).send("Wrong email or password.");
    }

    //Compare provided password and pwHash
    const passwordCorrecto = await bcrypt.compare(
      password,
      usuarioExistente.passwordHash
    );

    //Wrong password
    if (!passwordCorrecto) {
      return res.status(202).send("Wrong email or password.");
    }

    const token = jwt.sign(
      {
        user: usuarioExistente._id,
        email: usuarioExistente.email,
      },
      process.env.JWT_SECRET
    );
    //Get the token's information

    // Update last connection
    const time = new Date();
    usuarioExistente.last_connection = time;
    await usuarioExistente.save();

    //Send the token on an HttpOnly cookie.
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
  //Instead of deleting the cooking, send a new one with the same name but expired.
  //The browser will delete it right away. If checking with POSTMAN, it'll delete it as well.
});

//CONDITIONAL PAGE RENDERING, DEPENDING ON THE TOKEN
router.get("/loggedIn", (req, res) => {
  //Similar to auth middleware
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ value: false }).status(401);
    }
    //Send false value as JSON.

    jwt.verify(token, process.env.JWT_SECRET);
    //next() is not required.

    const { payload } = jwt.decode(token, { complete: true });
    const { email } = payload;

    res.json({ email, value: true });
  } catch (error) {
    res.json({ value: false }).status(401);
  }
});

module.exports = router;
