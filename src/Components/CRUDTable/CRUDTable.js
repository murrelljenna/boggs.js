import { useEffect, useState } from "react";
import reqs from "./CRUDTableReqs.js";
import HTTPClient from "../../api/axios.js";
import DataTable from "../DataTable.js";
import { DataType } from "ka-table/enums";

export default (props) => {
  // props -> reqs

  const [tableProps, setTableProps] = useState({});
  const [tableReqs, setTableReqs] = useState(reqs);

  useEffect(() => {
    const model = props.model;

    const getReqs = async (reqs) => {
      let reqData = {};
      for (const key in reqs) {
        // TODO: Parallelize
        reqData[key] = await reqs[key].get(HTTPClient);
      }

      return reqData;
    }

    getReqs(reqs).then(res => {
      setTableReqs(res);
    });
  }, []);

  return (
    <DataTable
      {...props}
      model={"contacts"}
      columns={[
        { key: "first_name", title: "First Name", dataType: DataType.String },
        { key: "last_name", title: "Last Name", dataType: DataType.String },
        { key: "address", title: "Address", dataType: DataType.String },
        {
          key: "unit_number",
          title: "Unit",
          dataType: DataType.String,
          style: { width: 50 },
        },
        {
          key: "email_address",
          isEditable: true,
          title: "Email Address",
          dataType: DataType.String,
        },
        {
          key: "phone_number",
          isEditable: true,
          title: "Phone Number",
          dataType: DataType.String,
        },
        {
          key: "organizer",
          title: "Organizer",
          dataType: DataType.String,
        },
        { key: "editColumn", style: { width: 75 } },
      ]}
      references={tableReqs}
    />
  );
};
