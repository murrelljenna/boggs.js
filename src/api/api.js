class API {
    constructor(baseURL, client) {
        this.baseURL = baseURL;
        this.client = client;
    }
    
    patch(model, pk, data) {
        return this.client.patch(`${this.baseURL}/${model}/${pk}/`, data);
    }

    get(model, pk = '') {
        return this.client.get(`${this.baseURL}/${model}/${pk}`);
    }

    post(model, pk, data) {
        return this.client.post(`${this.baseURL}/${model}/`, data);
    }

    delete(model, pk) {
        return this.client.delete(`${this.baseURL}/${model}/${pk}`);
    }
}

export default API;
