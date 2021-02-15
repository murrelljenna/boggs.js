import "ka-table/style.css";
import React from "react";
import api from "../api/axios.js";
import { AllValidators } from "./Validators.js"
import { formatPhone, formatAddress, formatOrganizer } from "./Formatters.js"

import { updateFilterRowOperator, updateFilterRowValue } from 'ka-table/actionCreators';

import { hideLoading, showLoading } from "ka-table/actionCreators";

import {
  AddButton,
  EditButton,
  SaveNewRowButton,
  SaveButton,
} from "./Buttons.js";

//import { hideLoading, showLoading } from "ka-table/actionCreators";

import { PhoneEditor, PrimaryTextareaEditor, ReferenceEditor } from "./Editors.js";

import { CustomLookupEditor, NumberEditor, DateEditor } from "./FilterEditors.js"

import { kaReducer, Table } from "ka-table";
import { SortingMode, FilteringMode } from "ka-table/enums";

import CRUDActions from './DataTableCRUDActions.js'

import "./DataTable.css"

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      props: {
        data: this.props.data,
        validation: AllValidators,
        format: ({ column, value }) => {
            switch (column.key) {
                case 'phone_number':
                    return formatPhone(value);
                case 'address':
                    let building = this.props.references.buildings[value];
                    return building ? formatAddress(building) : value
                case 'organizer':
                    let organizer = this.props.references.organizers[value];
                    return organizer ? formatOrganizer(organizer) : value;
            }
        },
        columns: this.props.columns,
        rowKeyField: "id",
        loading: {
          enabled: false,
          text: "Loading Data..",
        },
        sortingMode: SortingMode.Single,
        getNewRow: this.getNewRow,
        filteringMode: FilteringMode.FilterRow,
        dispatch: this.dispatch,
        childComponents:{
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
          filterRowCell: {
              content: (props) => {
                switch (props.column.key){
                  case 'passed': return <CustomLookupEditor {...props}/>;
                  case 'first_name': return <></>;
                  case 'last_name': return <></>;
                  case 'score': return <NumberEditor {...props}/>;
                  case 'nextTry': return <DateEditor {...props}/>;
                }
              }
            }
        }
      },
    };
  }

  dispatch = (action) => {
    this.setState((oldState) => ({
      props: kaReducer(oldState.props, action),
    }));

    let forwardAction = {};

    switch (action.type) {
      case "SaveRowEditors":
        let row = this.getEditableRow(action.rowKeyValue).reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );

        forwardAction = {
          type: "Update",
          rowKeyValue: action.rowKeyValue, 
          rowData: row,
          endpoint: this.props.model
        }

        CRUDActions(forwardAction);
        break;
      case "SaveNewRow":
        let data = this.getNewRow().reduce(
          (row, cell) => ((row[cell.columnKey] = cell.editorValue), row),
          {}
        );

        forwardAction = {
          type: "Create",
          rowData: data,
          endpoint: this.props.model
        }

        CRUDActions(forwardAction);
        // Bunch of crap code. Might have to add this: action.rowKeyValue = res.data.id;
        break;
      case "DeleteRow":
        forwardAction = {
          type: "Delete",
          rowKeyValue: action.rowKeyValue,
          endpoint: this.props.model
        }

        CRUDActions(forwardAction);
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

  render() {
    return (
      <Table
        {...this.state.props}

      />
    );
  }
}
