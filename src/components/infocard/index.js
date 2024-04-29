import React from 'react';

import './index.css';
import { useNavigate } from 'react-router';

const InfoCard = ({ name, info, id, linkType, callback }) => {
    const navigator = useNavigate();

    const onClick = async (e) => {
        if (callback) await callback(id, e);
        navigator(`/${linkType}/${id}`);
    };

    return (
        <div className='card' onClick={onClick}>
            <div className='cardTitle'>{name}</div>
            {Object.entries(info).map(([key, value]) => <div key={key}>{key}: {String(value)}</div>)}
        </div>
    );
};

export default InfoCard;
