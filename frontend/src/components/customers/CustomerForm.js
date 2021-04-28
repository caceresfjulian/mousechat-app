import React, { useState } from 'react';
import axios from 'axios';

function CustomerForm({obtenerEmpleados}) {
    //Definir con el hook useState el nombre, apellido y salario ingresado por el usuario.
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [salario, setSalario] = useState(0);

    //Definimos la función crearRegistro con el método POST enviado al puerto del backend con la estructura nombre, apellido, salario
    async function crearRegistro(e) {
        e.preventDefault();

        try {
            const datosEmpleado = {
                nombre, apellido, salario
            }
            await axios.post('http://localhost:4000/api', datosEmpleado);
            obtenerEmpleados();
        } catch (error) {
            console.error(error)
        }
    }

    //Forma asociada a su hook correspondiente.
    return (
        <div>
            <h1>Crear registro</h1>
            <input type="text" placeholder="nombre" value={nombre} onChange={(event) => { setNombre(event.target.value) }}></input>
            <input type="text" placeholder="apellido" value={apellido} onChange={(event) => { setApellido(event.target.value) }}></input>
            <input type="number" placeholder="salario" value={salario} onChange={(event) => { setSalario(event.target.value) }}></input>
            <button onClick={crearRegistro}>Crear registro</button>
        </div>
    )
}

export default CustomerForm
