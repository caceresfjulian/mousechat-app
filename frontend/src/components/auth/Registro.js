import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import Fade from "react-reveal/Fade";
import swal from "sweetalert";
import FormNotImg from "./FormNotImg";
import FormImg from "./FormImg";
import "./Registro.css";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [base64, setBase64] = useState("");
  const [imageType, setimageType] = useState("");
  //definimos los datos que serán capturados para ser enviados al back.

  const { obtenerLoggeo } = useContext(AuthContext);
  const historial = useHistory();

  // Función para interpretar la imagen recién subida, mostrarla en pantalla y almacenarla en base64
  function photoUpload(file) {
    const reader = new FileReader();
    // console.log("reader", reader);
    // console.log("file", file);
    if (reader !== undefined && file !== undefined) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        swal("Png/Jpg only", "Check the file and try again.", "warning");
      } else if (file.size > 2000000) {
        swal("Max size 2MB!", "Check the file and try again", "warning");
      } else {
        file.type === "image/png" ? setimageType("png") : setimageType("jpeg");
        reader.onloadend = (e) => {
          setBase64(btoa(e.target.result));
        };
        reader.readAsBinaryString(file);
        //Esta línea es muy importante. Sin ella, no se actualizan los estados
      }
    }
  }

  //Definimos una función ASÍNCRONA para el onSubmit del form
  async function registrar(e) {
    e.preventDefault();
    // Escribimos un try catch para enviar la solicitud al backend, almacenar la info en una const.
    // Aquí podríamos usar fetch para enviar la info, pero es preferible axios por su simpleza...
    try {
      swal("Loading", "Please wait a moment.", "info", {
        button: false,
      });
      const datosRegistrados = {
        email,
        password,
        passwordVerify,
        base64,
      };
      await axios
        .post("http://localhost:4000/auth", datosRegistrados)
        .then((res) => {
          if (res.status === 200) {
            swal("Logged in", "Enjoy your visit!", "success");
            obtenerLoggeo().then(() => historial.push("/"));
          } else {
            swal("Error", res.data, "error");
          }
        });
      //Hay que habilitar el uso de cookies, entonces en app.js añadimos withcredentials.
    } catch (error) {
      // console.log(error);
      swal("Error", "Try again.", "error");
    }
    // }
  }

  if (base64) {
    //Creamos una encuesta común.
    return (
      <div id="register-container">
        <Fade duration={1000}>
          <div id="register-left" />
        </Fade>
        <div id="register-right">
          <FormImg
            registrar={registrar}
            base64={base64}
            photoUpload={photoUpload}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordVerify={passwordVerify}
            setPasswordVerify={setPasswordVerify}
            imageType={imageType}
            setimageType={setimageType}
          />
        </div>
      </div>
    );
  } else {
    //Creamos una encuesta común.
    return (
      //Añadimos a cada input el valor y hook asociado por onChange.
      <div id="register-container">
        <Fade duration={1000}>
          <div id="register-left" />
        </Fade>
        <div id="register-right">
          <FormNotImg
            registrar={registrar}
            photoUpload={photoUpload}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            passwordVerify={passwordVerify}
            setPasswordVerify={setPasswordVerify}
          />
        </div>
      </div>
    );
  }
}

export default Registro;
