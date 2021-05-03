import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

function Directory() {

    const [Usuarios, setUsuarios] = useState([]);

    async function obtenerUsuarios() {
        const usuarios = await axios.get('http://localhost:4000/directory');
        setUsuarios(usuarios.data);
    }

    useEffect(() => {
        obtenerUsuarios();
    }, [])

    

    return (
        <div>
            <h1>Directory</h1>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Last Connection</th>
                    </tr>
                </thead>
                <tbody>
                    {Usuarios.map((usuario, key) => {
                        return <tr key={key}>
                            <td>{usuario.username}</td>
                            <td>{moment(usuario.last_connection).format('MM/DD/YYYY')}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Directory
