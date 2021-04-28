import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

function Registro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    //definimos los datos que serán capturados para ser enviados al back.

    const {obtenerLoggeo} = useContext(AuthContext);
    const historial = useHistory();

    //Definimos una función ASÍNCRONA para el onSubmit del form
    async function registrar(e) {
        e.preventDefault();

        // Escribimos un try catch para enviar la solicitud al backend, almacenar la info en una const.
        // Aquí podríamos usar fetch para enviar la info, pero es preferible axios por su simpleza.
        try {
            const datosRegistrados = {
                email,
                password,
                passwordVerify
            };

            await axios.post("http://localhost:4000/auth", datosRegistrados);
            //Hay que habilitar el uso de cookies, entonces en app.js añadimos withcredentials.
            await obtenerLoggeo();
            historial.push("/");


        } catch (error) {
            console.error(error);
        }
    }


    //Creamos una encuesta común.
    return (
        //Añadimos a cada input el valor y hook asociado por onChange.
        <div>
            <h1>Registrar nueva cuenta</h1>
            <form onSubmit={registrar}>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Verifica tu contraseña"
                    value={passwordVerify}
                    onChange={(e) => setPasswordVerify(e.target.value)}
                />
                <button type="submit">Crear cuenta</button>
            </form>
        </div>
    )
}

export default Registro
