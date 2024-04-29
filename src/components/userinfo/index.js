import React from "react";

import './index.css';
import axios from "axios";
import { DB_API } from "../../config";

const UserInfo = ({ id, username, owner, tokenIsOwner, urlPath, parentId, callback }) => {

    const removeUser = () => {
        if (!tokenIsOwner || owner) return;

        const token = localStorage.getItem('token');

        axios.delete(`${DB_API}/${urlPath}/${parentId}/member/${id}`, { data: { token } })
            .then(() => callback());
    };

    return (
        <div className='userCard'>
            <div className='cardTitle'>{username}</div>
            {!owner && tokenIsOwner ? <button onClick={removeUser}>Remove User</button> : null}
        </div>
    );
};

export default UserInfo;
