import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios'
import moment from 'moment'

// La información debe ser solicitada al backend.

function MyProfile() {

    const { emailCheck } = useContext(AuthContext);

    const [profile, setProfile] = useState("");
    const [overlay, setOverlay] = useState(false);
    //Muestra u oculta la ventana de edición
    const [edit, setEdit] = useState("");
    //Almacena el NOMBRE de la propiedad a editar, el cual es pasado al componente ventana de edición
    const [newValue, setNewValue] = useState("");
    const [base64, setBase64] = useState("");



    const closeEdit = (e) => {
        e.preventDefault();
        setOverlay(false);
    }

    const editOnClick = (param) => {
        setEdit(param);
        setOverlay(true);
    }

    async function obtenerPerfil() {
        const infoProfile = await axios.get('http://localhost:4000/myprofile');
        setProfile(infoProfile.data);
    }

    async function actualizarPerfil(e) {
        e.preventDefault();
        try {
            const newData = {
                email: emailCheck, edit, newValue
            }
            await axios.post('http://localhost:4000/myprofile', newData);
            obtenerPerfil();
            setBase64("");
            alert('Actualizado');

        } catch (error) {
            console.log(error);
        }
    }

    function photoUpload(file) {
        const reader = new FileReader();
        if (reader !== undefined && file !== undefined) {
            if (file.size > 2097152) {
                alert('Verifique el archivo e intente de nuevo.');
            } else if (file.type !== "image/png") {
                alert('Verifique la extensión del archivo e intente de nuevo.');
            }
            else {
                reader.onloadend = (e) => {
                    setBase64(btoa(e.target.result));
                    setEdit('base64');
                    setNewValue(btoa(e.target.result));
                }
                reader.readAsBinaryString(file)
                // Esta línea es muy importante. Sin ella, no se actualizan los estados
            }
        }
    }

    useEffect(() => {
        obtenerPerfil()
    }, [])

    if (profile !== "") {
        return (
            <div>
                <h1>My profile ({emailCheck}) </h1>
                <p>{`Created: ` + moment(profile.created).format('MM/DD/YYYY')}</p>
                <img src={base64 ? `data:image/png;base64,` + base64 : `data:image/png;base64,` + profile.base64} alt="Perfil" width="150" height="150" />
                <label>Update your profile pic: </label>
                <input
                    type="file"
                    accept=".png"
                    onChange={(e) => photoUpload(e.target.files[0])}
                />
                <button style={base64 ? { display: 'block' } : { display: 'none' }} onClick={e => actualizarPerfil(e)}>Update</button>
                <form style={{ display: overlay ? "block" : "none" }}>
                    <h5>Edit {edit}:</h5>
                    <input type="text" placeholder={`New ${edit}`} onChange={e => setNewValue(e.target.value)} />
                    <button onClick={e => actualizarPerfil(e)}>Update</button>
                    <button onClick={e => closeEdit(e)}>Close</button>
                </form>
                <h3>Username:</h3>
                <p>{profile.username}</p>
                <button onClick={e => editOnClick('username')}>Edit</button>
                <h3>Country:</h3>
                <p>{profile.country === "" ? `No country selected.` : profile.country}</p>
                <button onClick={e => editOnClick('country')}>Edit</button>
                <h3>Biography:</h3>
                <p>{profile.bio === "" ? `No biography provided.` : profile.bio}</p>
                <button onClick={e => editOnClick('bio')}>Edit</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>My profile</h1>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F02%2F15%2F84%2F43%2F240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg&f=1&nofb=1" alt="Perfil" />
                <h4>Waiting for server response.</h4>
            </div>
        )
    }


}

export default MyProfile
