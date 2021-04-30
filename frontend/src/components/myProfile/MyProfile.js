import React, { useEffect, useState } from 'react'
import axios from 'axios'

// La información debe ser solicitada al backend.

function MyProfile() {

    const [profile, setProfile] = useState("");

    async function obtenerPerfil() {
        const infoProfile = await axios.get('http://localhost:4000/myprofile');
        setProfile(infoProfile.data);
    }

    useEffect(() => {
        obtenerPerfil()
    }, [])

    if (profile !== "") {
        return (
            <div>
                <h1>My profile</h1>
                <img src={`data:image/png;base64,` + profile.base64} alt="Perfil" width="150" height="150" />
                <h4>{profile.username}</h4>
                <h4>{profile.country}</h4>
                <h4>{profile.bio}</h4>
            </div>
        )
    } else {
        return (
            <div>
                <h1>My profile</h1>
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft4.ftcdn.net%2Fjpg%2F02%2F15%2F84%2F43%2F240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg&f=1&nofb=1" alt="Perfil" />
                <h4>{profile.username}</h4>
                <h4>{profile.country}</h4>
                <h4>{profile.bio}</h4>
            </div>
        )
    }


}

export default MyProfile
