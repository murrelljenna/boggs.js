import "ka-table/style.css";
import React from "react";
import apiClient from "../api/apiClient.js";
import { AllValidators } from "./Validators.js"
import { formatPhone, formatAddress, formatOrganizer } from "./Formatters.js"

import { kaDateUtils } from 'ka-table/utils';

import { updateFilterRowOperator, updateFilterRowValue } from 'ka-table/actionCreators';

import {
  AddButton,
  EditButton,
  SaveNewRowButton,
  SaveButton,
} from "./Buttons.js";

import { hideLoading, showLoading } from "ka-table/actionCreators";

import { PhoneEditor, PrimaryTextareaEditor, ReferenceEditor } from "./Editors.js";

import { kaReducer, Table } from "ka-table";
import { SortingMode, FilteringMode } from "ka-table/enums";

import "./DataTable.css"

const CustomLookupEditor = ({
  column, dispatch,
}) => {
  const toNullableBoolean = (value) => {
    switch (value) {
      case 'true': return true;
      case 'false': return false;
    }
    return value;
  };
  return (
    <div>
      <select
        className='form-control'
        defaultValue={column.filterRowValue}
        onChange={(event) => {
          dispatch(updateFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
        }}>
        <option value=''/>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};

const FilterOperators = ({
  column, dispatch,
}) => {
  return (
    <select
      className='form-control'
      defaultValue={column.filterRowOperator}
      onChange={(event) => {
        dispatch(updateFilterRowOperator(column.key, event.currentTarget.value));
      }}>
      <option value={'='}>=</option>
      <option value={'<'}>{'<'}</option>
      <option value={'>'}>{'>'}</option>
      <option value={'<='}>{'<='}</option>
      <option value={'>='}>{'>='}</option>
    </select>
  );
};

const NumberEditor = ({
  column, dispatch,
}) => {
  return (
    <div>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        defaultValue={column.filterRowValue}
        style={{width: 60}}
        onChange={(event) => {
          const filterRowValue = event.currentTarget.value !== '' ? Number(event.currentTarget.value) : null;
          dispatch(updateFilterRowValue(column.key, filterRowValue));
        }}
        type='number'
      />
    </div>
  );
};

const DateEditor = ({
  column, dispatch,
}) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
  return (
    <div>
      <FilterOperators column={column} dispatch={dispatch}/>
      <input
        type='date'
        value={value || ''}
        onChange={(event) => {
          const targetValue = event.currentTarget.value;
          const filterRowValue = targetValue ? new Date(targetValue) : null;
          dispatch(updateFilterRowValue(column.key, filterRowValue));
        }}
      />
    </div>
  );
};

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addButton: React.createRef(),
      props: {
        data: [],
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
          enabled: true,
          text: "Loading Data..",
        },
        sortingMode: SortingMode.Single,
        getNewRow: this.getNewRow,
        filteringMode: FilteringMode.FilterRow,
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
    console.log(action.type)

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
                console.log(props);
                switch (props.column.key){
                  case 'passed': return <CustomLookupEditor {...props}/>;
                  case 'first_name': return <></>;
                  case 'last_name': return <></>;
                  case 'score': return <NumberEditor {...props}/>;
                  case 'nextTry': return <DateEditor {...props}/>;
                }
              }
            }
        }}
      />
    );
  }
}
