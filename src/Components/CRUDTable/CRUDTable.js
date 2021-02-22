import { useEffect, useState } from "react";
import HTTPClient from "../../api/axios.js";
import GetCRUDTableProps from "./CRUDTableConfig.js";
import forwardAction from "./CRUDTableActionForwarder.js";
import { kaReducer, Table } from "ka-table";
import CRUDActions from "./CRUDActions.js";
import Content from '../../Content';
import Tooltip from '@material-ui/core/Tooltip';

import "ka-table/style.css";
import "./CRUDTable.css"

const getReqs = async (reqs) => {
  let reqData = {};
  for (const key in reqs) {
    // TODO: Parallelize
    reqData[reqs[key].model] = await reqs[key].get(HTTPClient);
  }

  return reqData;
}

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
    getReqs(props.reqs).then(res => {
      let tablePropsInit = GetCRUDTableProps(res);

      tablePropsInit.columns = props.columns;
      tablePropsInit.dispatch = dispatch;

      getData(props.model).then(res => {
        tablePropsInit.data = res.data;
        setTableProps(tablePropsInit);
      });
    });

  }, []);



  if (tableProps.data.length === 0) {
    return (<div />);
  }

  return (
    <Content dispatch={dispatch} tableProps={tableProps}>
      <Table
        {...tableProps}
      />
    </Content>
  );
};

export default CRUDTable;
