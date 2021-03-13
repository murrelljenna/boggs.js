import { DataType } from "ka-table/enums";
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

export const EventsTable = (props) => {
  const columns = [
    { key: "name", title: "Name", dataType: DataType.String },
    { key: "location", title: "Location", dataType: DataType.String },
    { key: "description", title: "Description", dataType: DataType.String },
    { key: "editColumn", style: { width: 75 } },
  ]
  const reqs = [];
  const model = "events";

  return (
    <CRUDTable
      model={model}
      reqs={reqs}
      columns={columns}
    />
  );
};
