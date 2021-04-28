import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../context/AuthContext';
//Creamos botón de deslogueo que utiliza la funcion obtenerLoggeo pasada por contexto desde AuthContext

function LogOutBtn() {

    const {obtenerLoggeo} = useContext(AuthContext);

    const historial = useHistory();
    //Devuelve un array de todas las direcciones vistadas. 

    async function desloggeo() {
        await axios.get("http://localhost:4000/auth/logout");
        await obtenerLoggeo();
        //Para redirigir después de desloggearse, utilizamos useHistory de Router
        historial.push("/");
    }

    return (
        <button onClick={desloggeo}>
            Log out
        </button>
    )
}

export default LogOutBtn
