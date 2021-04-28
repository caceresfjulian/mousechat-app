import React from "react";
import axios from "axios";
import Router from "./Router";
import { AuthContextProvider } from "./components/context/AuthContext";
//Para permitir la conexión del front con el back, se utiliza axios. npm i axios

axios.defaults.withCredentials = true;
//definimos withcredentials true para habilitar cookies desde el inicio de la app

//Instalamos npm i react-router-dom para utilizar rutas en nuestra app.
function App() {
 
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
    /*
      <h1>Empleados actuales</h1>
      {listaEmpleados.map((empleado, key) => {
        return <div key={key} className="div_empleado">
          <p>{empleado.nombre}</p>
          <p>{empleado.apellido}</p>
          <p>{empleado.salario}</p>
          <input type="number" placeholder="Nuevo salario" onChange={(event) => { setnuevoSalario(event.target.value) }}></input>
          <button onClick={() => actualizarSalario(empleado._id)}>Actualizar</button>
          <button onClick={() => borrarRegistro(empleado._id)}>Borrar</button>
        </div>
      })}

    </div>*/
  );
}

export default App;
