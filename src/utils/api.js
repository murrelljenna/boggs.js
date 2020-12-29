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

export const newApi = {
    axios: api,
    cache: {},
    setCache: function(route, pk="", response) {
        if (pk) {
            this.cache[route] = this.cache[route] || {};
            response.then(res => this.cache[route][pk] = res.data);
        } else {
            response.then(res => this.cache[route] = res.data.reduce((obj, item) => {
                
                obj[item.id] = item;
                return obj;
            }, {}));
        }
    },
    get: function(route, pk="") {
        if (this.cache[route]) {
            return Promise.resolve({data: pk ? this.cache[route][pk] : this.cache[route]});
        } else {
            let response = this.axios.get(`${route}/${pk}`);
            this.setCache(route, pk, response);
            return response;
        }
    }
}

export default api;
