import DataTable from "./DataTable.js";
import { DataType } from "ka-table/enums";
import HTTPClient from "../api/axios.js";
import { useEffect, useState } from "react";
import CRUDTableReqs from "./CRUDTable/CRUDTableReqs.js";
import CRUDTable from "./CRUDTable/CRUDTable.js";

export const ContactsTable = (props) => {
  const columns = [
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
  ];
  const reqs = [CRUDTableReqs.BUILDINGS, CRUDTableReqs.ORGANIZERS];
  const model = "contacts";
  
  return (
    <CRUDTable
      model={model}
      reqs={reqs}
      columns={columns}
    />
  );
};

export const BuildingsTable = (props) => {
  const columns = [
    {
      key: "street_number",
      title: "Street Number",
      dataType: DataType.String,
    },
    { key: "street_name", title: "Street Name", dataType: DataType.String },
    { key: "postal_code", title: "Postal Code", dataType: DataType.String },
    { key: "editColumn", style: { width: 75 } },
  ]
  const reqs = [];
  const model = "buildings";

  return (
    <CRUDTable
      model={model}
      reqs={reqs}
      columns={columns}
    />
  );
};

export const OrganizersTable = (props) => {
  const columns = [
    { key: "first_name", title: "First Name", dataType: DataType.String },
    { key: "last_name", title: "Last Name", dataType: DataType.String },
    { key: "editColumn", style: { width: 75 } },
  ]
  const reqs = [];
  const model = "organizers";

  return (
    <CRUDTable
      model={model}
      reqs={reqs}
      columns={columns}
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
