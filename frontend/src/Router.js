import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './components/about/About';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import Chat from './components/chat/Chat';
import AuthContext from './components/context/AuthContext';
import Directory from './components/directory/Directory';
import Home from './components/home/Home';
import Join from './components/join/Join';
import Navbar from './components/layout/navbar';
import MyProfile from './components/myProfile/MyProfile';

//Aquí se crean las diferentes rutas del frontend gracias a react-router-dom.

function Router() {

    const { loggedIn, emailCheck } = useContext(AuthContext);


    //Modifiqué este tipo de lógica para evitar la advertencia: <Route> elements should not change from controlled to uncontrolled "
    if (loggedIn === true) {
        return (
            <BrowserRouter>
                <Navbar email={emailCheck} />
                <Switch>
                    <Route exact path="/join" component={Join} />
                    <Route path="/chat" component={Chat} />
                    <Route path="/myProfile" component={MyProfile} />
                    <Route path="/directory" component={Directory} />
                    <Route path="*" component={Join} />
                </Switch>
            </BrowserRouter>)
    }
    else {
        return (<BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/register" component={Registro} />
                <Route path="/Login" component={Login} />
                <Route path="/about" component={About} />
                <Route path="*" component={Home} />
            </Switch>
        </BrowserRouter>
        )
    }
}

export default Router;

