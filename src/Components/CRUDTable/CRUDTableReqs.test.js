import mockHTTPClient from '../../api/axios.js';
import reqs from "./CRUDTableReqs.js";

jest.mock('../../api/axios.js');

describe("CRUDTableReqs", () => {
  test("Buildings requirement invokes HTTPClient get", () => {
    reqs.buildings.get(mockHTTPClient);

    expect(mockHTTPClient.get).toHaveBeenCalledTimes(1);
  });

  test("Organizers requirement invokes HTTPClient get", () => {
    reqs.organizers.get(mockHTTPClient);

    expect(mockHTTPClient.get).toHaveBeenCalledTimes(1);
  });

  test("Organizer requirement retrieves {id: building} mapping", () => {
    mockHTTPClient.get = jest.fn((building) => Promise.resolve({
      data: [{
        id: '1',
        street_number: '50',
        street_name: 'Cordova'
      }]
    }));

    return reqs.organizers.get(mockHTTPClient).then(res => {
      expect(res['1']).toBeDefined();
    });
  });

  test("Building requirement retrieves {id: building} mapping", () => {
    mockHTTPClient.get = jest.fn((building) => Promise.resolve({
      data: [{
        id: '1',
        street_number: '50',
        street_name: 'Cordova'
      }]
    }));

    return reqs.buildings.get(mockHTTPClient).then(res => {
      expect(res['1']).toBeDefined();
    });
  });
});
