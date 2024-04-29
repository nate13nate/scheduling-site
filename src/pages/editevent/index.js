import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { DB_API } from "../../config";
import { fetchEvent } from "../../utils";

const EditEventPage = ({ newEvent }) => {
    const [searchParams] = useSearchParams();
    const group = searchParams.get('group') || null;

    const [name, setName] = useState('');
    const [time, setTime] = useState(new Date().getTime());
    const [location, setLocation] = useState('');
    const [event, setEvent] = useState({ owners: [], members: [], group });

    const navigator = useNavigate();
    const id = useParams()['id'];

    const intializeData = (data) => {
        setName(data.name);
        setTime(data.timestamp);
        setLocation(data.location);
        setEvent({ owners: data.owners, members: data.members, group: data.group });
    };

    useEffect(() => {
        if (newEvent) return;
        fetchEvent(id)
            .then(({ data }) => intializeData(data));
    }, [id, newEvent]);

    const getDateString = (date) => {
        const newDate = date ? new Date(date) : new Date();
        return new Date(newDate.getTime() - newDate.getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    };

    const upsert = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const body = {
            token,
            event: {
                ...event,
                name,
                timestamp: time,
                location,
            },
        };

        if (!newEvent) body.id = id;

        const { data: newId } = await axios.put(`${DB_API}/event/`, body);

        if (!newEvent) return;
        navigator(`/event/${newId}`);
    };

    return (
        <form onSubmit={upsert}>
            <fieldset>
                <label>Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} required /></label>
                <label>Time: <input type='datetime-local' value={getDateString(time)} onChange={(e) => setTime(new Date(e.target.value).getTime())} /></label>
                <label>Location: <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} /></label>

                <button type='submit'>{newEvent ? 'Create' : 'Update'}</button>
            </fieldset>
        </form>
    )
};

export default EditEventPage;
