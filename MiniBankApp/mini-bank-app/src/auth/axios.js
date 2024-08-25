import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});
export const axiosPublic = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
});
export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true
});