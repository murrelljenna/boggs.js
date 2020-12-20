import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
    headers: {
      'Authorization': `JWT ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
});
console.log("Adding interceptors");
api.interceptors.response.use(res => {
    return res;  
}, err => {
    console.log(err.response.status);
    if (err.response.status === 401) {
        window.location.replace("/login/");
    }
    return err;
});
console.log("Exporting api");

export default api;
