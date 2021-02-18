import DataTable from "./DataTable.js";
import { DataType } from "ka-table/enums";
import HTTPClient from "../api/axios.js";
import { useEffect, useState } from "react";
import CRUDTableReqs from "./CRUDTable/CRUDTableReqs.js";
import CRUDTable from "./CRUDTable/CRUDTable.js";

export const ContactsTable = (props) => {
  
  /*
   * Get other table data to lookup references and represent as something
   * other than a primary key.
   */

  return (
    <CRUDTable/>
  );
};

export const BuildingsTable = (props) => {
  return (
    <DataTable
      {...props}
      model={"buildings"}
      columns={[
        {
          key: "street_number",
          title: "Street Number",
          dataType: DataType.String,
        },
        { key: "street_name", title: "Street Name", dataType: DataType.String },
        { key: "postal_code", title: "Postal Code", dataType: DataType.String },
        { key: "editColumn", style: { width: 75 } },
      ]}
    />
  );
};

export const OrganizersTable = (props) => {
  return (
    <DataTable
      {...props}
      model={"organizers"}
      columns={[
        { key: "first_name", title: "First Name", dataType: DataType.String },
        { key: "last_name", title: "Last Name", dataType: DataType.String },
        { key: "editColumn", style: { width: 75 } },
      ]}
    />
  );
};

export const dnkTable = (props) => {
  return (
    <DataTable
      {...props}
      model={"dnk"}
      columns={[
        { key: "address", title: "Address", dataType: DataType.String },
        { key: "unit_number", title: "Unit Number", dataType: DataType.String },
        {
          key: "notes",
          title: "Notes",
          dataType: DataType.String,
          style: { width: 200 },
        },
        { key: "editColumn", style: { width: 75 } },
      ]}
    />
  );
};
