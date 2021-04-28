import React, { useState } from 'react';
import axios from 'axios';


function CustomerList({ listaEmpleados, obtenerEmpleados }) {

    //Definir con el hook useState el nuevoSalario que se quiere actualizar.
    const [nuevoSalario, setnuevoSalario] = useState(0);

    //Definimos la función actualizarSalario con el método PUT al cual le pasaremos el id del usuario a actualizar.
    async function actualizarSalario (id) {
        await axios.put('http://localhost:4000/api', {
            id: id,
            nuevoSalario: nuevoSalario
        });
        obtenerEmpleados();
    }

    //Definimos la función borrar registro, la cual pasará el id a borrar como un parámetro de la solicitud HTTP.
    async function borrarRegistro (id) {
        await axios.delete(`http://localhost:4000/api/${id}`);
        obtenerEmpleados();
    };

    return (
        <div>
            <h1>Lista</h1>
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
        </div>
    )
}

export default CustomerList
