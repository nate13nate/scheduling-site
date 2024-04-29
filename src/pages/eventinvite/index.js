import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DB_API } from "../../config";

const EventInvitePage = () => {
    const id = useParams()['id'];
    const navigator = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.post(`${DB_API}/event/${id}/member`, { token })
            .then(() => navigator(`/event/${id}`));
    }, [id, navigator]);

    return null;
};

export default EventInvitePage;
