import React from 'react';

const Button = ({ text, callback, id }) => {
    return <button key={id} onClick={(e) => callback(id, e)}>{text}</button>
};

export default Button;
