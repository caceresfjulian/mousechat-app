import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Fade from "react-reveal/Fade";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //definimos los datos que serán capturados para ser enviados al back.

  const { obtenerLoggeo } = useContext(AuthContext);
  const historial = useHistory();

  //Definimos una función ASÍNCRONA para el onSubmit del form
  async function loggeo(e) {
    e.preventDefault();
    // Escribimos un try catch para enviar la solicitud al backend, almacenar la info en una const.
    // Aquí podríamos usar fetch para enviar la info, pero es preferible axios por su simpleza.
    try {
      const datosLogin = {
        email,
        password,
      };

      await axios
        .post("http://localhost:4000/auth/login", datosLogin)
        .then((res) => {
          if (res.status === 200) {
            obtenerLoggeo().then(() => historial.push("/dashboard"));
          } else {
            swal("Error " + String(res.status), res.data, "error");
          }
        });
      //Hay que habilitar el uso de cookies, entonces en app.js añadimos withcredentials.

      //Añadimos de nuevo esto para actualizar el contexto y redireccionar.
    } catch (error) {
      swal("Error", "Check the provided information", "error");
    }
    // }
  }

  const dummyAccount = () => {
    setEmail("test@gmail.com");
    setPassword("password");
  };

  //Creamos una encuesta común.
  return (
    //Añadimos a cada input el valor y hook asociado por onChange.
    <div id="login-container">
      <div id="login-title">
        <h1 style={{ fontWeight: 1 }}>Login</h1>
      </div>
      <div
        style={{
          display: "flex ",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2 style={{ fontWeight: 1 }}>Welcome Back...</h2>
        <Fade duration={2000}>
          <div id="login-form">
            <form
              onSubmit={loggeo}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                className="login-input"
                type="email"
                placeholder="Email address"
                value={email}
                maxLength="30"
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: 20, marginTop: 40 }}
              />
              <input
                className="login-input"
                type="password"
                placeholder="Password"
                value={password}
                maxLength="30"
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: 20 }}
              />
              <p
                style={{ textAlign: "center", marginTop: 15, marginBottom: 40 }}
              >
                Don’t want to create an account? <br />
                <span
                  style={{
                    color: "#FF0000",
                    display: "inline",
                    cursor: "pointer",
                  }}
                  onClick={() => dummyAccount()}
                >
                  Login
                </span>{" "}
                with our dummy profile{" "}
              </p>
              <button type="submit">Log in</button>
            </form>
          </div>
          <p style={{ textAlign: "center", marginTop: 10 }}>
            Or <Link to="/register">create</Link> an account!
          </p>
        </Fade>
      </div>
    </div>
  );
}

export default Login;
