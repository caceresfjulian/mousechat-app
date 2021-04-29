import React, { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';

function Registro() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [file, setFile] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [base64, setBase64] = useState("");
    //definimos los datos que serán capturados para ser enviados al back.

    const { obtenerLoggeo } = useContext(AuthContext);
    const historial = useHistory();

    // Función para interpretar la imagen recién subida, mostrarla en pantalla y almacenarla en base64
    function photoUpload(file) {
        const reader = new FileReader();
        console.log("reader", reader)
        console.log("file", file)
        if (reader !== undefined && file !== undefined) {
            if (file.size > 2097152) {
                alert('Verifique el archivo e intente de nuevo.');
                setFile("");
            } else if (file.type !== "image/png") {
                alert('Verifique la extensión del archivo e intente de nuevo.');
                setFile("");
            }
            else {
                reader.onloadend = (e) => {
                    setFile(file);
                    setImagePreview(reader.result);
                    setBase64(btoa(e.target.result));
                }
            reader.readAsDataURL(file); 
            // Esta línea es muy importante. Sin ella, no se actualizan los estados
            }
        }
    }



    //Definimos una función ASÍNCRONA para el onSubmit del form
    async function registrar(e) {
        e.preventDefault();

        // Escribimos un try catch para enviar la solicitud al backend, almacenar la info en una const.
        // Aquí podríamos usar fetch para enviar la info, pero es preferible axios por su simpleza.
        try {
            const datosRegistrados = {
                email,
                password,
                passwordVerify,
                base64
            };

            await axios.post("http://localhost:4000/auth", datosRegistrados);
            //Hay que habilitar el uso de cookies, entonces en app.js añadimos withcredentials.
            await obtenerLoggeo();
            historial.push("/");


        } catch (error) {
            console.error(error);
        }
    }

    if (imagePreview) {
        //Creamos una encuesta común.
        return (
            //Añadimos a cada input el valor y hook asociado por onChange.
            <div>
                <h1>Registrar nueva cuenta</h1>
                <form onSubmit={registrar} encType="multipart/form-data">
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
                    <input
                        type="file"
                        accept=".png"
                        onChange={(e) => photoUpload(e.target.files[0])}
                    />
                    <button type="submit">Crear cuenta</button>
                </form>
                <img src={imagePreview} alt="Upload" width="150" height="150" />
            </div>
        )
    } else {
        //Creamos una encuesta común.
        return (
            //Añadimos a cada input el valor y hook asociado por onChange.
            <div>
                <h1>Registrar nueva cuenta</h1>
                <form onSubmit={registrar} encType="multipart/form-data">
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
                    <input
                        type="file"
                        accept=".png, .jpg"
                        onChange={(e) => photoUpload(e.target.files[0])}
                    />
                    <button type="submit">Crear cuenta</button>
                </form>
            </div>
        )
    }



}

export default Registro
