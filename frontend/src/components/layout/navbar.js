import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LogOutBtn from '../auth/LogOutBtn';
import AuthContext from '../context/AuthContext';

//Se crea una barra de navegación con el paquete npm i react-router-dom y su componente Link.

function Navbar({ email }) {

    const { loggedIn } = useContext(AuthContext);
    //Para utilizar el contexto, debemos importar useContext y haber exportado el contexto original.

    //De esta forma se escribe el condicional para no renderizar algunos elementos de los componentes 
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="container-fluid">
                    {loggedIn === false && (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Registro</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Login">Login</Link>
                                </li>
                            </ul>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <a className="navbar brand" href="/">
                                    {email}
                                </a>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/join">Unirse a Chat</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Customer">Administrar</Link>
                                </li>
                                <LogOutBtn className="btn btn-outline-success" />
                            </ul>
                        </>)
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
