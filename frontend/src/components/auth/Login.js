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
  //useState for the required data to execute the login process

  const { obtenerLoggeo } = useContext(AuthContext);
  const historial = useHistory();

  //Async function to submit the form
  async function loggeo(e) {
    e.preventDefault();
    // Try-Catch to send http req. Keep the required info in a const.
    // Could be Fetch as well, but Axios is shorter to write.
    try {
      swal("Loading", "Please wait a moment.", "info", {
        button: false,
      });
      const datosLogin = {
        email,
        password,
      };

      await axios
        .post("http://localhost:4000/auth/login", datosLogin)
        .then((res) => {
          if (res.status === 200) {
            swal("Logged in", "Enjoy your visit!", "success");
            obtenerLoggeo().then(() => historial.push("/dashboard"));
          } else {
            swal("Error", res.data, "error");
          }
        });
      //To make this work, should enable the cookies for the app in the backend.
      //in app.js file, add withcredentials.
    } catch (error) {
      swal("Error", "Check the provided information", "error");
    }
    // }
  }

  // Auto fill with the dummy account information.
  const dummyAccount = () => {
    setEmail("test@gmail.com");
    setPassword("password");
  };

  return (
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
