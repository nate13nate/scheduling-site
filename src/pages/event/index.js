import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Error from '../../components/error';
import Button from '../../components/button';
import { fetchEvent } from '../../utils';
import { DB_API } from '../../config';
import UserInfo from '../../components/userinfo';

const EventPage = () => {
    const [event, setEvent] = useState({});
    const [members, setMembers] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userId, setUserId] = useState('');

    const id = useParams()['id'];
    const navigator = useNavigate();

    const updateMembers = () => {
        const token = localStorage.getItem('token');

        axios.get(`${DB_API}/event/${id}/members?token=${token}`)
            .then(({ data }) => setMembers(data));
    };

    useEffect(() => {
        fetchEvent(id)
            .then(({ data }) => setEvent(data))
            .catch(({ message }) => setErrorMessage(message));

        const token = localStorage.getItem('token');

        axios.get(`${DB_API}/event/${id}/members?token=${token}`)
            .then(({ data }) => setMembers(data));

        axios.get(`${DB_API}/user/id/${token}`)
            .then(({ data }) => setUserId(data));
        
            axios.get(`${DB_API}/user/${token}/admin`)
                .then(({ data }) => setIsAdmin(data.admin));
    }, [id]);

    useEffect(() => {
        if (members.length > 0 && userId !== '' && !members.some(({ id }) => id === userId)) navigator('/');
    }, [userId, members, navigator]);

    const { owners = [] } = event;

    const deleteEvent = () => {
        if (!isAdmin && !owners.includes(userId)) return;

        const token = localStorage.getItem('token');

        axios.delete(`${DB_API}/event/${id}`, { data: { token } })
            .then(() => navigator('/'));
    };

    const removeSelf = () => {
        const token = localStorage.getItem('token');

        axios.delete(`${DB_API}/event/${id}/member/${userId}`, { data: { token } })
            .then(() => navigator('/'));
    };

    return (
        <div>
            <Error message={errorMessage} />
            <div>{event.name}</div>
            <div>Location: {event.location}</div>
            <div>Time: {new Date(event.timestamp).toDateString()}</div>
            {isAdmin || owners.includes(userId) ? (
                <div>
                    <Button text='Edit Event' callback={() => navigator(`/event/edit/${id}`)} />
                    <Button text='Delete Event' callback={deleteEvent} />
                </div>
            ) : null}

            <div>Members in the Event:</div>
            {members.map((member) => <UserInfo {...member} tokenIsOwner={isAdmin || owners.includes(userId)} urlPath='event' parentId={id} callback={updateMembers} />)}
            {!isAdmin && !owners.includes(userId) ? <Button text='Remove Self' callback={removeSelf} /> : null}
            <div>To invite other users to this event, use the following link: http://localhost:3000/invite/event/{id}</div>
        </div>
    );
};

export default EventPage;
