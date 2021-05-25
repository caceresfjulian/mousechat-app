// creamos un componente con un estado al que todos los demás componentes solicitarán una información 
// específica. En este caso, el componente dirá si el usuario está loggeado gracias a la existencia y 
// validez del token.
import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';

const AuthContext = createContext();
//Se crea después de la función el contexto

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [emailCheck, setemailCheck] = useState("");

    async function obtenerLoggeo() {
        const respuestaLoggeo = await axios.get("http://localhost:4000/auth/loggedIn");
        setLoggedIn(respuestaLoggeo.data.value);
        setemailCheck(respuestaLoggeo.data.email);
    }

    useEffect(() => {
        obtenerLoggeo();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, obtenerLoggeo, emailCheck }}>
            {props.children}
        </AuthContext.Provider>
        //se incluye aquí el componente authcontext.provider para pasar contexto
    )
}

export default AuthContext
export { AuthContextProvider };
