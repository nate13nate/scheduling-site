import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import InfoBoard from '../../components/infoboard';
import { DB_API } from '../../config';

import './index.css';
import Button from '../../components/button';

const DashboardPage = () => {
    const [groupProps, setGroupProps] = useState([]);
    const [eventProps, setEventProps] = useState([]);

    const navigator = useNavigate();

    const groupToProps = (group) => {
        const name = group.name;
        const id = group._id.$oid;
        const info = {};

        return { name, id, info, linkType: 'group' };
    };;

    const eventToProps = (event) => {
        const name = event.name;
        const id = event._id.$oid;
        const info = { Time: new Date(event.timestamp).toDateString(), Location: event.location };

        return { name, id, info, linkType: 'event' };
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${DB_API}/group/user/${token}`)
            .then(({ data }) => setGroupProps(data.map(groupToProps)));
        axios.get(`${DB_API}/event/user/${token}`)
            .then(({ data }) => setEventProps(data.map(eventToProps)));
        // axios.get(`${DB_API}/`)
    }, []);

    const createEvent = () => {
        navigator('/event/create');
    };

    const createGroup = () => {
        navigator('/group/create');
    };

    return (
        <div className='boardsContainer'>
            <InfoBoard title={'Groups'} infoCardProps={groupProps} CreateButton={<Button text='Create Group' callback={createGroup} id='Group' />} />
            <InfoBoard title={'Events'} infoCardProps={eventProps} CreateButton={<Button text='Create Event' callback={createEvent} id='Event' />} />
        </div>
    );
}

export default DashboardPage;
