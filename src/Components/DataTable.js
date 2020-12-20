import "ka-table/style.css";
import React from "react";
import api from "../utils/api.js";

import {
  AddButton,
  EditButton,
  SaveNewRowButton,
  SaveButton,
} from "./Buttons.js";

import { hideLoading, showLoading } from "ka-table/actionCreators";

import { PrimaryTextareaEditor, AddressEditor } from "./Editors.js";

import { kaReducer, Table } from "ka-table";
import { SortingMode } from "ka-table/enums";


export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addButton: React.createRef(),
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
    api
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
    return api.post(`http://localhost:8000/${this.props.model}/`, data);
  };

  update = (pk, data) => {
    api
      .patch(`http://localhost:8000/${this.props.model}/${pk}/`, data)
      .then((res) => {
        this.dispatch(hideLoading());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  apiDelete = (pk) => {
    this.dispatch(showLoading("Deleting Row..."));
    api
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
      /*
       ** Update row
       */
      case "SaveRowEditors":
        this.dispatch(showLoading("Updating..."));
        let row = this.getEditableRow(action.rowKeyValue).reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );
        this.update(action.rowKeyValue, row);

        break;

      /*
       ** Create row
       */
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

      /*
       ** Delete row
       */
      case "DeleteRow":
        this.apiDelete(action.rowKeyValue);
        break;
      default:
        break;
    }
  };

  getNewRow = () => {
    return this.state.props.editableCells.filter(
      (cell) => JSON.stringify(cell.rowKeyValue) === JSON.stringify({})
    );
  };

  getEditableRow = (pk) => {
    return this.state.props.editableCells.filter(
      (cell) => cell.rowKeyValue === pk
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
              } else if (props.column.key === "first_name") {
                return <PrimaryTextareaEditor {...props} />;
              }
            },
          },
          headCell: {
            content: (props) => {
              if (props.column.key === "editColumn") {
                return <AddButton setRef={this.addButton} {...props} />;
              }
            },
          },
        }}
      />
    );
  }
}
