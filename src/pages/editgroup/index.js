import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DB_API } from "../../config";
import { fetchGroup } from "../../utils";

const EditGroupPage = ({ newGroup }) => {
    const [name, setName] = useState('');
    const [group, setGroup] = useState({ owners: [], members: [] });

    const navigator = useNavigate();
    const id = useParams()['id'];

    const intializeData = (data) => {
        setName(data.name);
        setGroup({ owners: data.owners, members: data.members });
    };

    useEffect(() => {
        if (newGroup) return;
        fetchGroup(id, false)
            .then(({ data }) => intializeData(data));
    }, [id, newGroup]);

    const upsert = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const body = {
            token,
            group: {
                ...group,
                name,
            },
        };

        if (!newGroup) body.id = id;

        const { data: newId } = await axios.put(`${DB_API}/group/`, body);

        if (!newGroup) return;
        navigator(`/group/${newId}`);
    };

    return (
        <form onSubmit={upsert}>
            <fieldset>
                <label>Name: <input type='text' value={name} onChange={(e) => setName(e.target.value)} required /></label>

                <button type='submit'>{newGroup ? 'Create' : 'Update'}</button>
            </fieldset>
        </form>
    )
};

export default EditGroupPage;
