// vim: set expandtab
// vim: set tabstop=4
// vim: set shiftwidth=4

import "ka-table/style.css";
import React, { Component, useState } from 'react';
import axios from 'axios';

import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { closeRowEditors, openRowEditors, saveRowEditors } from 'ka-table/actionCreators';

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
   </div >
 );
};

export default class Contacts extends React.Component {
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
                editableCells: [{
                    columnKey: 'last_name',
                    rowKeyValue: 2,
                }],
                rowKeyField:'id',
                sortingMode: SortingMode.Single,
            }
        }

        this.dispatch = this.dispatch.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8000/contacts/").then((res) => {
            console.log(res.data);
            this.setState(oldState => ({
                props: {
                    ...oldState.props,
                    data: JSON.parse(res.data).map((contact) => ({ id: contact.pk, ...contact.fields})),
                }
            }));
            console.log(this.state.props);
        }).catch((err) => {
            console.log(err)
        });
    }

    update = (pk, data) => {
        axios.patch(`http://localhost:8000/contacts/${pk}/`, data).then((res) => {
            
        }).catch((err) => {
            console.log(err);
        });
    }

    dispatch = (action) => {
        this.setState(oldState => ({
            props: kaReducer(oldState.props, action)
        }));

        switch (action.type) {
            case "UpdateEditorValue":
                this.update(action.rowKeyValue, {[action.columnKey]: action.value});
            break;
        }
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
                                return <SaveButton {...props}/>
                            }
                        }
                    }
                }}
            />
        );
	}
}
