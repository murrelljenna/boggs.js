// vim: set expandtab
// vim: set tabstop=4
// vim: set shiftwidth=4

import "ka-table/style.css";
import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import { ITableProps, kaReducer, Table } from "ka-table";
import { DataType, EditingMode, SortingMode } from "ka-table/enums";
import {
  hideLoading,
  showLoading,
  closeEditor,
  updateCellValue,
  updateEditorValue,
} from "ka-table/actionCreators";
import { DispatchFunc } from "ka-table/types";
import {
  closeRowEditors,
  openRowEditors,
  saveRowEditors,
  showNewRow,
  saveNewRow,
  hideNewRow,
  deleteRow,
} from "ka-table/actionCreators";

const AddButton = ({ dispatch }) => {
  return (
    <div className="plus-cell-button">
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/plus.svg"
        alt="Add New Row"
        title="Add New Row"
        onClick={() => dispatch(showNewRow())}
      />
    </div>
  );
};

const EditButton = ({ dispatch, rowKeyValue }) => {
  return (
    <div className="edit-cell-button">
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/edit.svg"
        alt="Edit Row"
        title="Edit Row"
        onClick={() => {
          dispatch(openRowEditors(rowKeyValue));
        }}
      />
    </div>
  );
};

const SaveNewRowButton = ({ dispatch }) => {
  const saveNewData = () => {
    let rowKeyValue = -1;
  };
  return (
    <div className="buttons">
      <img
        tabIndex="0"
        src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
        className="save-cell-button"
        alt="Save"
        title="Save"
        onClick={() => {
          console.log("tiddies");
          dispatch(
            saveNewRow(-1, {
              validate: true,
            })
          );
        }}
        onKeyDown={(event) => {
          console.log("Arf");
          if (event.keycode === 13) {
            saveNewData();
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

const SaveButton = ({ dispatch, rowKeyValue, rowData }) => {
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

const AddressEditor = ({ column, rowKeyValue, dispatch, value }) => {
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/buildings/")
      .then((res) => {
        setBuildings(
          JSON.parse(res.data).map((building) => ({
            address: `${building.fields.street_number} ${building.fields.street_name}`,
            id: building.pk,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(value);
  const [editorValue, setValue] = useState(value);

  return (
    <div>
      <select
        value={editorValue}
        className="form-control"
        onBlur={() => {
          dispatch(updateEditorValue(rowKeyValue, column.key, editorValue));
        }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      >
        {buildings.map((building) => (
          <option key={building.id} value={building.id}>
            {building.address}
          </option>
        ))}
      </select>
    </div>
  );
};

export default class Contacts extends React.Component {
  getNewRow = () => {
    return this.state.props.data;
  };

  constructor(props) {
    super(props);

    this.state = {
      props: {
        data: [],
        columns: this.props.columns,
        rowKeyField: "id",
        loading: {
          enabled: true,
          text: "Loading Data..",
        },
        sortingMode: SortingMode.Single,
        getNewRow: this.getNewRow,
      },
    };

    this.dispatch = this.dispatch.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.dispatch(showLoading("Loading Data..."));
    axios
      .get(`http://localhost:8000/${this.props.model}/`)
      .then((res) => {
        this.setState((oldState) => ({
          props: {
            ...oldState.props,
            data: JSON.parse(res.data).map((object) => ({
              id: object.pk,
              ...object.fields,
            })),
          },
        }));
        this.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create = (data) => {
    this.dispatch(showLoading("Creating..."));
    return axios.post(`http://localhost:8000/${this.props.model}/`, data);
  };

  update = (pk, data) => {
    axios
      .patch(`http://localhost:8000/${this.props.model}/${pk}/`, data)
      .then((res) => {
        this.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  apiDelete = (pk) => {
    axios
      .delete(`http://localhost:8000/${this.props.model}/${pk}/`)
      .then((res) => {
        this.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  dispatch = (action) => {
    this.setState((oldState) => ({
      props: kaReducer(oldState.props, action),
    }));

    switch (action.type) {
      case "SaveRowEditors":
        this.dispatch(showLoading("Updating..."));
        let row = this.getEditableRow(action.rowKeyValue).reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );
        this.update(action.rowKeyValue, row);

        break;
      case "SaveNewRow":
        let data = this.getNewRow().reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );
        this.create(JSON.stringify(data))
          .then((res) => {
            action.rowKeyValue = res.data.id;
            this.dispatch(hideLoading());
          })
          .catch((err) => {
            console.log(err);
          });
        break;

      case "DeleteRow":
        this.dispatch(showLoading("Deleting Row..."));
        this.apiDelete(action.rowKeyValue);
        break;
      case "OpenRowEditors":
        break;
    }
  };

  getNewRow = () => {
    return this.state.props.editableCells.filter(
      (cell) => JSON.stringify(cell.rowKeyValue) == JSON.stringify({})
    );
  };

  getEditableRow = (pk) => {
    return this.state.props.editableCells.filter(
      (cell) => cell.rowKeyValue == pk
    );
  };

  getRow = (pk) => {
    return this.state.props.data.find((row) => (row.id = pk));
  };

  render() {
    return (
      <Table
        {...this.state.props}
        dispatch={this.dispatch}
        childComponents={{
          cellText: {
            content: (props) => {
              if (props.column.key === "editColumn") {
                return <EditButton {...props} />;
              }
            },
          },
          cellEditor: {
            content: (props) => {
              if (props.column.key === "editColumn") {
                // If this is a new row (without a rowkeyvalue), lets use a different save button
                if (JSON.stringify(props.rowKeyValue) === "{}") {
                  return <SaveNewRowButton {...props} />;
                } else {
                  return <SaveButton {...props} />;
                }
              } else if (props.column.key === "address") {
                return <AddressEditor {...props} />;
              }
            },
          },
          headCell: {
            content: (props) => {
              if (props.column.key === "editColumn") {
                return <AddButton {...props} />;
              }
            },
          },
        }}
      />
    );
  }
}
