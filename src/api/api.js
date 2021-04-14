class API {
    constructor(baseURL, client) {
        this.baseURL = baseURL;
        this.client = client;
    }
    
    patch(model, pk, data) {
        return this.client.patch(`${this.baseURL}/${model}/${pk}/`, JSON.stringify(data));
    }

    get(model, pk = undefined) {
        console.log(pk);
        if (pk === undefined) {
            return this.client.get(`${this.baseURL}/${model}/`);
        } else {
            return this.client.get(`${this.baseURL}/${model}/${pk}/`);
        }
    }

    post(model, data) {
        return this.client.post(`${this.baseURL}/${model}/`, JSON.stringify(data));
    }

    delete(model, pk) {
        return this.client.delete(`${this.baseURL}/${model}/${pk}/`);
    }
}

export default API;
