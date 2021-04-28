import React, { useEffect, useState } from 'react'
import CustomerForm from './CustomerForm'
import CustomerList from './CustomerList'
import axios from 'axios'

function Customers() {
    //Definir con el hook useState un array vacío para la lista de empleados.
    const [listaEmpleados, setListaEmpleados] = useState([]);

    async function obtenerEmpleados() {
        const listaEmpleadosInfo = await axios.get('http://localhost:4000/api');
        setListaEmpleados(listaEmpleadosInfo.data)
    }

    //con useEffect, al cargar el componente, se enviara una solicitud GET al back para recibir la lista de empleados
    // Se escribe un objeto vacío después de la coma para indicar que sólo se utiliza el efecto justo 
    // como un ComponentDidMount. 
    useEffect(() => {
        obtenerEmpleados();
    }, []);


    // Aquí se pasa la lista de empleados del componente padre al hijo. 
    // Pasamos la función obtener empleados al formulario para así ejecutarla cada vez que se actualice la 
    // lista de empleados y refresque la lista. Es por eso que el estado listaEmpleados se define acá.
    return (
        <div>
            <CustomerForm obtenerEmpleados={obtenerEmpleados} />
            <CustomerList listaEmpleados={listaEmpleados} obtenerEmpleados={obtenerEmpleados}/>
        </div>
    )
}

export default Customers
