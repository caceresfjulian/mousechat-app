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
  //useState to capture required information for the sign up process.

  const { obtenerLoggeo } = useContext(AuthContext);
  const historial = useHistory();

  // Authenticate the uploaded img, show it on screen and store it at base64
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
        //This is a key line to update the states while interpreting imgs.
      }
    }
  }

  //To submit the form
  async function registrar(e) {
    e.preventDefault();
    // Try-catch to send the req, store required info in a const.
    // As well, could be Fetch but Axios is shorter.
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
        .post("https://mousechat-mern.herokuapp.com/auth", datosRegistrados)
        .then((res) => {
          if (res.status === 200) {
            swal("Logged in", "Enjoy your visit!", "success");
            obtenerLoggeo().then(() => historial.push("/"));
          } else {
            swal("Error", res.data, "error");
          }
        });
      //Should enable cookies, so at the app.js file must add withcredentials.
    } catch (error) {
      // console.log(error);
      swal("Error", "Try again.", "error");
    }
    // }
  }

  // Conditional rendering (with-without uploaded img)
  if (base64) {
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
    return (
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
