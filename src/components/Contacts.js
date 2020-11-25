// vim: set expandtab
// vim: set tabstop=4
// vim: set shiftwidth=4

import "ka-table/style.css";
import React, { Component, useState } from 'react';
import axios from 'axios';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { closeRowEditors, openRowEditors, saveRowEditors, showNewRow, saveNewRow, hideNewRow, deleteRow } from 'ka-table/actionCreators';

const AddButton = ({
  dispatch,
}) => {
 return (
  <div className='plus-cell-button'>
    <img
      src='https://komarovalexander.github.io/ka-table/static/icons/plus.svg'
      alt='Add New Row'
      title='Add New Row'
      onClick={() => dispatch(showNewRow())}
    />
  </div>
 );
};

const EditButton = ({
  dispatch, rowKeyValue
}) => {
  return (
   <div className='edit-cell-button'>
     <img
      src='https://komarovalexander.github.io/ka-table/static/icons/edit.svg'
      alt='Edit Row'
      title='Edit Row'
      onClick={() => { dispatch(openRowEditors(rowKeyValue))}}
    />
   </div>
  );
};


export const rowJustSaved = () => ({
    type: "RowJustSaved", // required
});

const SaveNewRowButton = ({
  dispatch
}) => {
  const saveNewData = () => {
    let rowKeyValue = -1;
    dispatch(saveNewRow(rowKeyValue, {
      validate: true
    }));
  };
  return (
   <div className='buttons'>
    <img
      src='https://komarovalexander.github.io/ka-table/static/icons/save.svg'
      className='save-cell-button'
      alt='Save'
      title='Save'
      onClick={saveNewData}
    />
    <img
      src='https://komarovalexander.github.io/ka-table/static/icons/close.svg'
      className='close-cell-button'
      alt='Cancel'
      title='Cancel'
      onClick={() => dispatch(hideNewRow())}
    />
   </div>
 );
};

const SaveButton = ({
  dispatch, rowKeyValue, rowData
}) => {
  return (
    <div className='buttons'
      style={{display: 'flex', justifyContent: 'space-between'}} >
      <img
        src='https://komarovalexander.github.io/ka-table/static/icons/save.svg'
        className='save-cell-button'
        alt='Save'
        title='Save'
        onClick={() => {
          dispatch(saveRowEditors(rowKeyValue, {
            validate: true,
            rowKeyValue: rowKeyValue,
            rowData: rowData,
          }));
        }}
      />
      <img
        src='https://komarovalexander.github.io/ka-table/static/icons/close.svg'
        className='close-cell-button'
        alt='Cancel'
        title='Cancel'
        onClick={() => {
          dispatch(closeRowEditors(rowKeyValue));
        }}
      />
        <img
          src='https://komarovalexander.github.io/ka-table/static/icons/delete.svg'
          className='delete-row-column-button'
          onClick={() => dispatch(deleteRow(rowKeyValue))}
          alt=''
        />
   </div >
 );
};

export default class Contacts extends React.Component {
    getNewRow = () => {
        return this.state.props.data;
    }

    constructor() {
        super();
        this.state = {
            props: { 
                columns: [
                    { key: 'first_name', title: 'First Name', dataType: DataType.String },
                    { key: 'last_name', title: 'Last Name', dataType: DataType.String },
                    { key: 'address', title: 'Address', dataType: DataType.String },
                    { key: 'unit_number', title: 'Unit', dataType: DataType.String },
                    { key: 'email_address', isEditable: true, title: 'Email Address', dataType: DataType.String },
                    { key: 'editColumn', style: { width: 50 } },
                ],
                data: [],
                rowKeyField:'id',
                sortingMode: SortingMode.Single,
                getNewRow: this.getNewRow
            }
        }

        this.dispatch = this.dispatch.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8000/contacts/").then((res) => {
            this.setState(oldState => ({
                props: {
                    ...oldState.props,
                    data: JSON.parse(res.data).map((contact) => ({ id: contact.pk, ...contact.fields})),
                }
            }));
        }).catch((err) => {
            console.log(err)
        });
    }

    create = (data) => {
        return axios.post(`http://localhost:8000/contacts/`, data);
    }

    update = (pk, data) => {
        axios.patch(`http://localhost:8000/contacts/${pk}/`, data).then((res) => {
            
        }).catch((err) => {
            console.log(err);
        });
    }
    
    apiDelete = (pk) => {
        return axios.delete(`http://localhost:8000/contacts/${pk}/`);
    }

    dispatch = (action) => {
        this.setState(oldState => ({
            props: kaReducer(oldState.props, action)
        }));

        switch (action.type) {
            case "SaveRowEditors":
                let row = this.getRow(action.rowKeyValue).reduce((row, cell) => (row[cell.columnKey] = cell.editorValue, row) ,{});
                this.update(action.rowKeyValue, {[action.columnKey]: action.value});
                break;
            case "SaveNewRow":
                let data = this.getNewRow().reduce((row, cell) => (row[cell.columnKey] = cell.editorValue, row) ,{});
                this.create(JSON.stringify(data)).then((res) => {
                    action.rowKeyValue = res.data.id;
                }).catch((err) => {
                    console.log(err);
                });
                break;

            case "DeleteRow":
                this.apiDelete(action.rowKeyValue);
                break;
        }
    }

    getNewRow = () => {
        return this.state.props.editableCells.filter(cell => JSON.stringify(cell.rowKeyValue) == JSON.stringify({}));
    }

    getRow = (pk) => {
        return this.state.props.editableCells.filter(cell => cell.rowKeyValue == pk);
    }

	render() {
        return (
            <Table 
                {...this.state.props}
                dispatch={this.dispatch}
                childComponents={{
                    cellText: {
                        content: (props) => {
                            if (props.column.key === 'editColumn'){
                                return <EditButton {...props}/>
                            }
                        }
                    },
                    cellEditor: {
                        content: (props) => {
                            if (props.column.key === 'editColumn'){
                                // If this is a new row (without a rowkeyvalue), lets use a different save button
                                if (JSON.stringify(props.rowKeyValue) === '{}') {
                                    return <SaveNewRowButton {...props}/>
                                } else {
                                    return <SaveButton {...props}/>
                                }
                            }
                        }
                    },
                    headCell: {
                        content: (props) => {
                            if (props.column.key === 'editColumn'){
                                return <AddButton {...props}/>;
                            }
                        }
                    }
                }}
            />
        );
	}
}
