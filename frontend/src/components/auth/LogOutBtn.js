import axios from "axios";
import React, { useContext } from "react";
import { useHistory } from "react-router";
import AuthContext from "../context/AuthContext";
//Create Log Out button, that activates the funct "obtenerLoggeo", obtained thanks to AuthContext

function LogOutBtn() {
  const { obtenerLoggeo, setValidProfile } = useContext(AuthContext);

  const historial = useHistory();
  //UseHistory returns an array with all the visited locations.

  async function desloggeo() {
    await setValidProfile("");
    await axios.get("https://mousechat-mern.herokuapp.com/auth/logout");
    await obtenerLoggeo();
    //To redirect after logging out, useHistory.push().
    historial.push("/");
  }

  return (
    <span onClick={desloggeo} id="logout-button">
      Log out
    </span>
  );
}

export default LogOutBtn;
