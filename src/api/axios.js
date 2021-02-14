import axios from 'axios';

const HTTPClient = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
});

HTTPClient.interceptors.request.use(req => {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return req;
}, err => err
);

HTTPClient.interceptors.response.use(res => {
    return res;  
}, err => {
    if (err.response.status === 401) {
        window.location.replace("/login/");
    }
    return err;
});

export default HTTPClient;
