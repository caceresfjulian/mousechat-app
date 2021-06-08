/*This middleware validates the cookie for each HTTP request and classifies the private endpoints.
In some manner, it filters out some unathorized requests. 
*/
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    //To access the cookies, its required the cookie parser package and pass them in the req
    //'npm i cookie-parser'.
    if (!token) {
      return res.status(401).send("Unauthorized.");
    }
    //If there's no token, send message.

    //Validate the token.
    const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);

    req.user = tokenVerificado.user;
    //Add the verified user to the token after the token is authenticated.
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send("Unauthorized.");
  }
}

module.exports = auth;
