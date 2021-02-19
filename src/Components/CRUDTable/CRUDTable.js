import { useEffect, useState } from "react";
import HTTPClient from "../../api/axios.js";
import DataTable from "../DataTable.js";
import { DataType } from "ka-table/enums";

export default (props) => {
  const [tableReqs, setTableReqs] = useState({});

  useEffect(() => {
    const model = props.model;

    const getReqs = async (reqs) => {
      let reqData = {};
      for (const key in reqs) {
        // TODO: Parallelize
        reqData[reqs[key].model] = await reqs[key].get(HTTPClient);
      }

      return reqData;
    }

    getReqs(props.reqs).then(res => {
      setTableReqs(res);
    });
  }, []);

  if (Object.keys(tableReqs).length !== props.reqs.length) {
    return (<div />);
  }

  return (
    <DataTable
      {...props}
      model={props.model}
      columns={props.columns}
      references={tableReqs}
    />
  );
};
