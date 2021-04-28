/*Este es un middleware que va a validar la cookie de las solicitudes HTTP para los END POINTS PRIVADOS,
los cuales serían CRUD de registros. Con esto se pueden filtrar solicitudes no autorizadas de hackers. 
*/
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token;
        //Para tener acceso a las cookies, debemos instalar el paquete cookie parser y pasarlas en la req
        //npm i cookie-parser. Es un middleware para express 
        if (!token) {
            return res.status(401).json({ mensajeError: "No autorizado." })
        } //Si no hay token, error.

        //Validar el token, que nadie más lo ha solicitado. 
        const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);

        req.user = tokenVerificado.user;
        /*Aquí agregamos a la solicitud el usuario verificado para continuar trabajando con tal información
        después de aprobado el middleware en los end points privados. 
        */
       next();
       //Utilizamos next para terminar la función del middleware y continuar con la ruta. 
    } catch (error) {
        console.error(error);
        res.status(401).json({ mensajeError: "No autorizado." })
    }
}

module.exports = auth;