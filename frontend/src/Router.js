import React, { useContext, useState, useCallback, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoadingPage from "./components/loadingPage/LoadingPage";
import AuthContext from "./components/context/AuthContext";
import Navbar from "./components/layout/navbar";

const Home = React.lazy(() => import("./components/home/Home"));
const About = React.lazy(() => import("./components/about/About"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Registro = React.lazy(() => import("./components/auth/Registro"));
const Dashboard = React.lazy(() => import("./components/dashboard/Dashboard"));
const Chat = React.lazy(() => import("./components/chat/Chat"));

//Set the routes here with react-router-dom.

function Router() {
  const { loggedIn } = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);

  const pressF5 = useCallback((e) => {
    if (e.keyCode === 116) {
      e.preventDefault();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", pressF5, false);
    return () => {
      document.removeEventListener("keydown", pressF5, false);
    };
  }, [pressF5]);

  //Conditional rendering.
  if (loggedIn === true) {
    return (
      <React.Suspense fallback={<LoadingPage />}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/chat" component={Chat} />
            <Route path="*" component={Dashboard} />
          </Switch>
        </BrowserRouter>
      </React.Suspense>
    );
  } else {
    return (
      <React.Suspense fallback={<LoadingPage />}>
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
      </React.Suspense>
    );
  }
}

export default Router;
