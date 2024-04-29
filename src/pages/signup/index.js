import React from 'react';
import { useNavigate } from 'react-router-dom';

import Login from '../../components/login';

const SignUpPage = () => {
    const navigator = useNavigate();

    return (
        <div>
            <Login subdir='/user/create' buttonText='Sign up' />
            <button onClick={() => { navigator('/login'); }} >Login</button>
        </div>
    );
}

export default SignUpPage;

