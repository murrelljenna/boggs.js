import API from "../../api/api.js";
import HTTPClient from "../../api/axios.js";

const api = new API('http://localhost:8000', HTTPClient);

const CRUDActions = (model) => {
  return (action) => {
    switch (action.type) {
      case "Update":
        return api.patch(model, action.rowKeyValue, action.rowData);
        break;
      case "Create":
        return api.post(model, action.rowData);
        break;
      case "Delete":
        return api.delete(model, action.rowKeyValue)
        break;
    }
  }
}

export default CRUDActions;
