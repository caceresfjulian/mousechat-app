import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Registro from './components/auth/Registro';
import Chat from './components/chat/Chat';
import AuthContext from './components/context/AuthContext';
import Customers from './components/customers/Customers';
import Join from './components/join/Join';
import Navbar from './components/layout/navbar';

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
                    <Route path="/customer" component={Customers}/>
                    <Route path="*" component={Join}/>
                </Switch>
            </BrowserRouter>)
    }
    else {
        return (<BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <h1>Home</h1>
                </Route>
                <Route path="/register" component={Registro} />
                <Route path="/Login" component={Login}/>
                <Route path="*" component={Registro}/>
            </Switch>
        </BrowserRouter>
        )
    } 
}

export default Router;

