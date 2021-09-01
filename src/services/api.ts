import axios from 'axios';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default api;