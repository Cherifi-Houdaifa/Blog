import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassord] = useState('');
    const navigate = useNavigate();
    const btnClickHandler = async (e) => {
        const response = await fetch(
            process.env.SERVER_URL.url + '/api/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }
        );
        const data = await response.json();
        if (!data.token) {
            return alert(data.message);
        }
        sessionStorage.setItem('JWT_TOKEN', `bearer ${data.token}`);
        navigate('/');
    };

    return (
        <main className="login-content">
            <div>
                <input
                    type="text"
                    placeholder="username"
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    type="text"
                    placeholder="password"
                    autoComplete="off"
                    onChange={(e) => setPassord(e.target.value)}
                    value={password}
                />
                <input type="button" value="Login" onClick={btnClickHandler} />
            </div>
        </main>
    );
}
