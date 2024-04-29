import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { DB_API } from '../../config';

const Login = ({ subdir, buttonText }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigator = useNavigate();

    function login(e) {
        e.preventDefault();

        setLoading(true);
        axios.post(`${DB_API}${subdir}`, { username, password })
            .then((res) => { handleSuccess(res); })
            .catch((res) => { handleFailure(res); });
    }

    function handleSuccess(res) {
        localStorage.setItem('token', res.data);

        navigator('/');
    }

    function handleFailure(res) {
        console.log(res);

        setLoading(false);
    }

    function render() {
        return (
            <form onSubmit={(e) => { login(e) }}>
                <fieldset disabled={loading}>
                    <label>
                        Username:
                        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>

                    <label>
                        Password:
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <button type='submit'>{buttonText}</button>
                </fieldset>
            </form>
        );
    }

    return render();
}

export default Login;
