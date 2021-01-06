import "ka-table/style.css";
import React from "react";
import api, {newApi} from "../utils/api.js";
import { AllValidators } from "./Validators.js"

import {
  AddButton,
  EditButton,
  SaveNewRowButton,
  SaveButton,
} from "./Buttons.js";

import { hideLoading, showLoading } from "ka-table/actionCreators";
import { formatPhoneNumber } from "react-phone-number-input";

import { PhoneEditor, PrimaryTextareaEditor, ReferenceEditor } from "./Editors.js";

import { kaReducer, Table } from "ka-table";
import { SortingMode } from "ka-table/enums";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addButton: React.createRef(),
      props: {
        data: [],
        validation: AllValidators,
        format: ({ column, value }) => {
            if (column.key === 'phone_number') {
                return formatPhoneNumber(value);
            }
            if (column.key === 'address') {
                let building = this.props.references.buildings[value];
                console.log(this.props.references);
                if (building) {
                    return `${building.street_number} ${building.street_name}`;
                } else {
                    return value;
                }
            }
            if (column.key === 'organizer') {
                let organizer = this.props.references.organizers[value];
                console.log(this.props.references);
                if (organizer) {
                    return `${organizer.first_name} ${organizer.last_name}`;
                } else {
                    return value;
                }
            }

        },
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
            data: res.data.map((object) => ({
              id: object.id,
              ...object,
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
    console.log(this.props.references);
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
                console.log(this.props.references.buildings);
                return <ReferenceEditor {...props} data={this.props.references.buildings} mapping={(building) => ({
                    display: `${building[1].street_number} ${building[1].street_name}`,
                    id: building[1].id,
                  })}/>;
              } else if (props.column.key === "organizer") {
                return <ReferenceEditor {...props} data={this.props.references.organizers} mapping={(object) => ({
                  display: `${object[1].first_name} ${object[1].last_name}`,
                  id: object[1].id,
                })}/>;
              } else if (props.column.key === "first_name") {
                return <PrimaryTextareaEditor {...props} />;
              } else if (props.column.key === "phone_number") {
                return <PhoneEditor {...props} />
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
