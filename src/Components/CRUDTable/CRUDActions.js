const CRUDActions = (api) => {
  return (action) => {
    switch (action.type) {
      case "Update": return api.patch(action.rowKeyValue, action.rowData);
      case "Create": return api.post(action.rowData);
      case "Delete": return api.delete(action.rowKeyValue)
    }
  }
}

export default CRUDActions;
