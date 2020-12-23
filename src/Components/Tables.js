import DataTable from "./DataTable.js";
import { DataType } from "ka-table/enums";

export const ContactsTable = (props) => {
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
          key: "organizer", title: "Organizer", dataType: DataType.String
        },
        { key: "editColumn", style: { width: 75 } },
      ]}
    />
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
