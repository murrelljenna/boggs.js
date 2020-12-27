import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
});

api.interceptors.response.use(res => {
    return res;  
}, err => {
    if (err.response.status === 401) {
        window.location.replace("/login/");
    }
    return err;
});

export default api;
