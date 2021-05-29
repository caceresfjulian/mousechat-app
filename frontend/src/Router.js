import React, { useContext, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "./components/about/About";
import Login from "./components/auth/Login";
import Registro from "./components/auth/Registro";
import Chat from "./components/chat/Chat";
import AuthContext from "./components/context/AuthContext";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/home/Home";
import Navbar from "./components/layout/navbar";

//Aquí se crean las diferentes rutas del frontend gracias a react-router-dom.

function Router() {
  const { loggedIn } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);

  //Modifiqué este tipo de lógica para evitar la advertencia: <Route> elements should not change from controlled to uncontrolled "
  if (loggedIn === true) {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route path="/chat" component={Chat} />
          <Route path="*" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <BrowserRouter>
        <Navbar isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Registro} />
          <Route path="/Login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="*" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
