const getNewRow = (tableProps) => {
  return tableProps.editableCells.filter(
    (cell) => JSON.stringify(cell.rowKeyValue) === JSON.stringify({})
  );
};

const getEditableRow = (pk, tableProps) => {
  return tableProps.editableCells.filter(
    (cell) => cell.rowKeyValue === pk
  );
};

const forwardAction = (dispatches) => {
  return (action, tableProps) => {
    let forwardAction = action;

    switch (action.type) {
      case "SaveRowEditors":
        let row = getEditableRow(action.rowKeyValue, tableProps).reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );

        forwardAction = {
          type: "Update",
          rowKeyValue: action.rowKeyValue, 
          rowData: row,
        }
        break;
      case "SaveNewRow":
        let data = getNewRow(tableProps).reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );

        forwardAction = {
          type: "Create",
          rowData: data,
        }
        break;
      case "DeleteRow":
        forwardAction = {
          type: "Delete",
          rowKeyValue: action.rowKeyValue,
        }
        break;
      default:
        break;
    }

    dispatches.forEach(dispatch => {
      dispatch(forwardAction)
    });
  }
}

export default forwardAction;
