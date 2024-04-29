import React from 'react';

const Error = ({ message }) => {
    return message ? <div>{message}</div> : null
};

export default Error;
