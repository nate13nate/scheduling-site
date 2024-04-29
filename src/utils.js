import axios from "axios";

import { DB_API } from "./config";

export const fetchEvent = (id) => {
    const token = localStorage.getItem('token');

    return axios.get(`${DB_API}/event/${id}?token=${token}`);
};

export const fetchGroup = (id, getEvents) => {
    const token = localStorage.getItem('token');

    return axios.get(`${DB_API}/group/${id}?token=${token}&getEvents=${getEvents}`)
};
