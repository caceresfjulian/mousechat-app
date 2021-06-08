// This is a component that passes data to all the app. It states the user's current authentication status
// by accessing the token (cookie).
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
//It's created after the context function

function AuthContextProvider(props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [emailCheck, setemailCheck] = useState("");
  const [validProfile, setValidProfile] = useState("");
  const [profileIsOpen, setProfileIsOpen] = useState(false);

  async function obtenerLoggeo() {
    await axios
      .get("https://mousechat-mern.herokuapp.com/auth/loggedIn")
      .then((res) => {
        setLoggedIn(res.data.value);
        setemailCheck(res.data.email);
      });
  }

  useEffect(() => {
    obtenerLoggeo();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        obtenerLoggeo,
        emailCheck,
        validProfile,
        setValidProfile,
        profileIsOpen,
        setProfileIsOpen,
      }}
    >
      {props.children}
    </AuthContext.Provider>
    //Required the AuthContext.Provider to pass all the data.
  );
}

export default AuthContext;
export { AuthContextProvider };
