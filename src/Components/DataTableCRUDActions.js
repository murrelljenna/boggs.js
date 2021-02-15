import API from "../api/api.js";
import HTTPClient from "../api/axios.js";

const api = new API('http://localhost:8000', HTTPClient);

export default (action) => {
  switch (action.type) {
    case "Update":
      return api.patch(action.endpoint, action.rowKeyValue, action.rowData);
      break;
    case "Create":
      return api.post(action.endpoint, action.rowData);
      break;
    case "Delete":
      return api.delete(action.endpoint, action.rowKeyValue)
      break;
  }
}
