import React from 'react'
import { Link } from 'react-router-dom';

function FormImg({ registrar, base64, photoUpload, email, setEmail, password, setPassword, passwordVerify, setPasswordVerify }) {
    return (
        <div>
            <form onSubmit={registrar} encType="multipart/form-data" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h1 style={{ fontWeight: 1 }}>Register</h1>
                <label >
                    <img src={`data:image/png;base64,${base64}`} alt="Upload" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #FFFFFF', display: 'flex', alignItems: 'center', cursor: 'pointer' }} />
                    <input
                        className="register-upload-image"
                        type="file"
                        accept=".png, .jpg"
                        onChange={(e) => photoUpload(e.target.files[0])}
                    />
                </label>
                <p style={{ fontSize: '0.8em', display: 'block', marginTop: 20 }}>Upload a profile pic</p>
                <div className="form-background">
                    <input
                        className="register-input"
                        type="email"
                        placeholder="Email address"
                        value={email}
                        maxLength="30"
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginTop: 40 }}
                    />
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        maxLength="30"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    <input
                        className="register-input"
                        type="password"
                        placeholder="Verify your password"
                        maxLength="30"
                        value={passwordVerify}
                        onChange={(e) => setPasswordVerify(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />
                    <button className="register-button" type="submit">Register</button>
                </div>
                <p style={{ textAlign: 'center', marginTop: 30 }}>Don’t want to create an account? <br />
                    <Link to="/login" style={{ color: '#FF0000' }}>Login</Link> with our dummy profile
                        </p>
            </form>
        </div>
    )
}

export default FormImg
