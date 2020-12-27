import {
  showNewRow,
  openRowEditors,
  closeRowEditors,
  saveRowEditors,
  deleteRow,
  hideNewRow,
  saveNewRow,
} from "ka-table/actionCreators";

export const AddButton = ({ dispatch }) => {
  return (
    <img
      tabIndex="0"
      autoFocus
      style={{'margin-right': 'auto', 'margin-left': 'auto', 'display': 'block'}}
      src="https://komarovalexander.github.io/ka-table/static/icons/plus.svg"
      alt="Add New Row"
      title="Add New Row"
      onClick={() => dispatch(showNewRow())}
    />
  );
};

export const EditButton = ({ dispatch, rowKeyValue }) => {
  return (
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/edit.svg"
        style={{'margin-right': 'auto', 'margin-left': 'auto', 'display': 'block'}}
        alt="Edit Row"
        title="Edit Row"
        onClick={() => {
          dispatch(openRowEditors(rowKeyValue));
        }}
      />
  );
};

export const SaveNewRowButton = ({ dispatch }) => {
  return (
    <div className="buttons">
      <img
        tabIndex="0"
        src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
        className="save-cell-button"
        alt="Save"
        title="Save"
        onClick={() => {
          dispatch(
            saveNewRow(-1, {
              validate: true,
            })
          );
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            dispatch(
              saveNewRow(-1, {
                validate: true,
              })
            );
          }
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/close.svg"
        className="close-cell-button"
        alt="Cancel"
        title="Cancel"
        onClick={() => dispatch(hideNewRow())}
      />
    </div>
  );
};

export const SaveButton = ({ dispatch, rowKeyValue, rowData }) => {
  return (
    <div
      className="buttons"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <img
        tabIndex="0"
        src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
        className="save-cell-button"
        alt="Save"
        title="Save"
        onClick={() => {
          dispatch(
            saveRowEditors(rowKeyValue, {
              validate: true,
              rowKeyValue: rowKeyValue,
            })
          );
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            dispatch(
              saveRowEditors(rowKeyValue, {
                validate: true,
                rowKeyValue: rowKeyValue,
              })
            );
          }
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/close.svg"
        className="close-cell-button"
        alt="Cancel"
        title="Cancel"
        onClick={() => {
          dispatch(closeRowEditors(rowKeyValue));
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/delete.svg"
        className="delete-row-column-button"
        onClick={() => dispatch(deleteRow(rowKeyValue))}
        alt=""
      />
    </div>
  );
};
