import React from 'react';
import InfoCard from '../infocard';

import './index.css';

const InfoBoard = ({ title, infoCardProps, CreateButton }) => {
    return (
        <div className='infoBoardContainer'>
            <div>{title}</div>
            {CreateButton ? CreateButton : null}
            <div className='infoCardsContainer'>{infoCardProps.map((props) => <InfoCard {...props} key={props.id} />)}</div>
        </div>
    );
}

export default InfoBoard;
