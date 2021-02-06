import API from "./api.js";
import mockHTTPClient from './axios.js';

jest.mock('./axios.js');

describe("API Wrapper", () => {
    test("invokes HTTPClient get", () => {
        const model = 'contacts';
        const pk = '1';

        const api = new API('captainbeefheart', mockHTTPClient);
        api.get(model, pk);
        
        expect(mockHTTPClient.get).toHaveBeenCalledTimes(1);
    });

    test("invokes HTTPClient patch", () => {
        const model = 'contacts';
        const pk = '1';
        const data = {};

        const api = new API('captainbeefheart', mockHTTPClient);
        api.patch(model, pk, data);
        
        expect(mockHTTPClient.patch).toHaveBeenCalledTimes(1);
    });

    test("invokes HTTPClient post", () => {
        const model = 'contacts';
        const pk = '1';
        const data = {};

        const api = new API('captainbeefheart', mockHTTPClient);
        api.post(model, pk, data);
        
        expect(mockHTTPClient.post).toHaveBeenCalledTimes(1);
    });

    test("invokes HTTPClient delete", () => {
        const model = 'contacts';
        const pk = '1';

        const api = new API('captainbeefheart', mockHTTPClient);
        api.delete(model, pk);
        
        expect(mockHTTPClient.delete).toHaveBeenCalledTimes(1);
    });
});
