import React from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '../../components/login';

const LoginPage = () => {
    const navigator = useNavigate();

    return (
        <div>
            <Login subdir='/user/login' buttonText='Login' />
            <button onClick={() => { navigator('/signup'); }}>Sign Up</button>
        </div>
    );
}

export default LoginPage;
