import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { DB_API } from "../../config";

const ALLOWED_UNAUTHENTICATED_ENDPOINTS = ['/login', '/signup'];
const DEFAULT_UNAUTHENTICATED_ENDPOINT = '/login';
const DEFAULT_AUTHENTICATED_ENDPOINT = '/';

const Header = () => {
    const [signedIn, setSignedIn] = useState(false);

    const navigator = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setSignedIn(false);

        const inUnauthenticatedEndpoint = ALLOWED_UNAUTHENTICATED_ENDPOINTS.includes(pathname);

        if (!token && !inUnauthenticatedEndpoint) navigator(DEFAULT_UNAUTHENTICATED_ENDPOINT);

        axios.get(`${DB_API}/user/id/${token}`)
            .then(() => {
                setSignedIn(true);
                if (inUnauthenticatedEndpoint) navigator(DEFAULT_AUTHENTICATED_ENDPOINT);
            })
            .catch(() => { if (!inUnauthenticatedEndpoint) navigator(DEFAULT_UNAUTHENTICATED_ENDPOINT); });
    }, [pathname, navigator, setSignedIn]);

    const signOut = () => {
        const token = localStorage.getItem('token');
        setSignedIn(false)

        axios.delete(`${DB_API}/user/${token}`)
            .then(() => navigator('/login'))
    };

    return signedIn ? (
        <div>
            <button onClick={() => navigator('/')}>Return to Dashboard</button>
            <button onClick={() => signOut()}>Sign Out</button>
        </div>
    ) : null;
};

export default Header;
