import React from "react";
import axios from "axios";
import Router from "./Router";
import { AuthContextProvider } from "./components/context/AuthContext";
//Axios for the front to back connection "npm i axios".

axios.defaults.withCredentials = true;
//withcredentials true to enable the cookies since the beggining of the app.

//npm i react-router-dom to use routes in our app.
function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
