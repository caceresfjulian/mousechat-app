import React from 'react'
import { Link } from 'react-router-dom';

function Form_not_base64({ registrar, photoUpload, email, setEmail, password, setPassword, passwordVerify, setPasswordVerify }) {
    return (
        <div>
            <form onSubmit={registrar} encType="multipart/form-data" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <h1 style={{ fontWeight: 1 }}>Register</h1>
                <label className="upload-image">
                    <input
                        className="register-upload-image"
                        type="file"
                        accept=".png, .jpg"
                        onChange={(e) => photoUpload(e.target.files[0])}
                    />
                    <svg width="55" height="64" viewBox="0 0 71 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: 29 }}>
                        <path d="M65.4531 39.0802V56.4552C65.4531 57.8337 64.209 58.9552 62.6797 58.9552H8.32031C6.79104 58.9552 5.54688 57.8337 5.54688 56.4552V39.0802H0V56.4552C0 60.5907 3.73249 63.9552 8.32031 63.9552H62.6797C67.2675 63.9552 71 60.5907 71 56.4552V39.0802H65.4531Z" fill="white" />
                        <path d="M35.5 0.0455322L18.2653 15.581L22.1875 19.1165L32.7265 9.61653V48.581H38.2734V9.61653L48.8124 19.1165L52.7346 15.581L35.5 0.0455322Z" fill="white" />
                    </svg>
                </label>
                <p style={{ fontSize: '0.8em', marginTop: 20 }}>Upload a profile pic</p>
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
                        maxLength="30"
                        value={password}
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
                        style={{  marginBottom: 20 }}
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

export default Form_not_base64
