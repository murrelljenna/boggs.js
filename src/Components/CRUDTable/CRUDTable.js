import { useEffect, useState } from "react";
import HTTPClient from "../../api/axios.js";
import GetCRUDTableProps from "./CRUDTableConfig.js";
import forwardAction from "./CRUDTableActionForwarder.js";
import { kaReducer, Table } from "ka-table";
import CRUDActions from "./CRUDActions.js";
import CRUDTableToolbar from './CRUDTableToolbar';

import "ka-table/style.css";
import "./CRUDTable.css"

const getData = async (model) => HTTPClient.get(`${model}/`);

const CRUDTable = (props) => {
  const [tableProps, setTableProps] = useState({data: []});
  const actions = CRUDActions(props.model);
  const forward = forwardAction([actions]);

  const dispatch = (action) => {
    setTableProps((currentTableProps) => {
      forward(action, currentTableProps);
      return {...currentTableProps, ...kaReducer(currentTableProps, action)}
    });
  }

  useEffect(() => {
    getData(props.route).then(res => {
      let tablePropsInit = GetCRUDTableProps(props.DetailsRow);

      tablePropsInit.columns = props.columns;
      tablePropsInit.dispatch = dispatch;

      tablePropsInit.data = res.data;
      setTableProps(tablePropsInit);
    });
  }, []);

  if (tableProps.data.length === 0) {
    return (<div />);
  }

  return (
    <CRUDTableToolbar dispatch={dispatch} tableProps={tableProps}>
      <Table
        {...tableProps}
      />
    </CRUDTableToolbar>
  );
};

export default CRUDTable;
