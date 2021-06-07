import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router";
import Fade from "react-reveal/Fade";
import swal from "sweetalert";
import FormNotImg from "./FormNotImg";
import FormImg from "./FormImg";
import "./Registro.css";
import LoadingComp from "../loadingPage/LoadingComp";

const RegistroImg = React.lazy(() => import("./RegistroImg"));

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [base64, setBase64] = useState("");
  //definimos los datos que serán capturados para ser enviados al back.

  const { obtenerLoggeo } = useContext(AuthContext);
  const historial = useHistory();

  // Función para interpretar la imagen recién subida, mostrarla en pantalla y almacenarla en base64
  function photoUpload(file) {
    const reader = new FileReader();
    console.log("reader", reader);
    console.log("file", file);
    if (reader !== undefined && file !== undefined) {
      if (file.type !== "image/png") {
        swal("Png only", "Check the file and try again", "warning");
      } else if (file.size > 2000000) {
        swal("Max size 2MB!", "Check the file and try again", "warning");
      } else {
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

    // if (
    //   email.trim().length < 8 ||
    //   password.length < 8 ||
    //   passwordVerify !== password ||
    //   !base64
    // ) {
    //   swal("Error", "Check the provided information.", "error");
    // } else {
    // Escribimos un try catch para enviar la solicitud al backend, almacenar la info en una const.
    // Aquí podríamos usar fetch para enviar la info, pero es preferible axios por su simpleza.
    try {
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
            obtenerLoggeo().then(() => historial.push("/"));
          } else {
            swal("Error " + String(res.status), res.data, "error");
          }
        });
      //Hay que habilitar el uso de cookies, entonces en app.js añadimos withcredentials.
    } catch (error) {
      console.log(error);
      swal("Error", "Try again.", "error");
    }
    // }
  }

  if (base64) {
    //Creamos una encuesta común.
    return (
      <div id="register-container">
        <React.Suspense fallback={<LoadingComp />}>
          <RegistroImg />
        </React.Suspense>
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
