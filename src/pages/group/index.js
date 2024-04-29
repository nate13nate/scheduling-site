import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { DB_API } from '../../config';
import Error from '../../components/error';
import InfoCard from '../../components/infocard';
import Button from '../../components/button';
import UserInfo from '../../components/userinfo';

const GroupPage = () => {
    const [group, setGroup] = useState({});
    const [members, setMembers] = useState([]);
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminSet, setAdminSet] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const id = useParams()['id'];
    const navigator = useNavigate();

    const updateMembers = () => {
        const token = localStorage.getItem('token');

        axios.get(`${DB_API}/group/${id}/members?token=${token}`)
            .then(({ data }) => setMembers(data));
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`${DB_API}/group/${id}?token=${token}&getEvents=true`)
            .then(({ data }) => setGroup(data))
            .catch(({ message }) => setErrorMessage(message));
    
        axios.get(`${DB_API}/user/id/${token}`)
            .then(({ data }) => setUserId(data));

        axios.get(`${DB_API}/group/${id}/members?token=${token}`)
            .then(({ data }) => setMembers(data));
        
        axios.get(`${DB_API}/user/${token}/admin`)
            .then(({ data }) => setIsAdmin(data.admin))
            .then(() => setAdminSet(true));
    }, [id]);

    useEffect(() => {
        if (adminSet && !isAdmin && members.length > 0 && userId !== '' && !members.some(({ id }) => id === userId)) navigator('/');
    }, [userId, members, adminSet, isAdmin, navigator]);

    const addUserToEvent = async (id) => {
        const event = group.events.find(value => value._id.$oid === id);

        const token = localStorage.getItem('token');
        const { data: userId } = await axios.get(`${DB_API}/user/id/${token}`);

        if (event.members.includes(userId) || event.owners.includes(userId)) return;

        return axios.post(`${DB_API}/event/${id}/member`, { userId, token });
    };

    const cardProps = (event) => {
        const name = event.name;
        const info = {
            Location: event.location,
            Time: new Date(event.timestamp).toDateString(),
        };
        const id = event._id.$oid;
        const linkType = 'event';

        return { name, info, id, linkType, callback: addUserToEvent };
    };

    const createEvent = () => {
        navigator(`/event/create?group=${id}`);
    };

    const { owners = [] } = group;

    const deleteGroup = () => {
        if (!isAdmin && !owners.includes(userId)) return;

        const token = localStorage.getItem('token');

        axios.delete(`${DB_API}/group/${id}`, { data: { token } })
            .then(() => navigator('/'));
    };

    const removeSelf = () => {
        const token = localStorage.getItem('token');

        axios.delete(`${DB_API}/group/${id}/member/${userId}`, { data: { token } })
            .then(() => navigator('/'));
    };

    return (
        <div>
            <Error message={errorMessage} />
            <div>{group.name}</div>
            
            {isAdmin || owners.includes(userId) ? (
                <div>
                    <Button text='Edit Group' callback={() => navigator(`/group/edit/${id}`)} />
                    <Button text='Delete Group' callback={deleteGroup} />
                </div>
            ) : null}

            <div>Events:</div>
            <div>{group.events ? group.events.map((event) => <InfoCard {...cardProps(event)} />) : null}</div>
            <Button text='Create Event' callback={createEvent} id='Event' />
    
            <div>Members in the Event:</div>
            {members.map((member) => <UserInfo {...member} tokenIsOwner={isAdmin || owners.includes(userId)} urlPath='group' parentId={id} callback={updateMembers} />)}
            {!isAdmin && !owners.includes(userId) ? <Button text='Remove Self' callback={removeSelf} /> : null}
            <div>To invite other users to this event, use the following link: http://localhost:3000/invite/group/{id}</div>
        </div>
    );
};

export default GroupPage;
