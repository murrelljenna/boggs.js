import { DataType } from "ka-table/enums";
import CRUDTableReqs from "./CRUDTable/CRUDTableReqs.js";
import HTTPClient from "../api/axios.js";
import CRUDTable from "./CRUDTable/CRUDTable.js";
import { OptionEditor, PhoneEditor, PrimaryTextareaEditor, ReferenceEditorClosure, ReferenceEditorMappings} from "./Editors.js";
import { useEffect, useState } from "react";
import { formatAddress, formatLookup, formatOrganizer } from "./Formatters.js";
import { formatPhoneNumber } from "react-phone-number-input";

export const ContactsTable = (props) => {
  const [organizers, setOrganizers] = useState({});
  const [buildings, setBuildings] = useState({});
  useEffect(() => {
    CRUDTableReqs.ORGANIZERS.get(HTTPClient).then(res => {
      setOrganizers(res);
    });

    CRUDTableReqs.BUILDINGS.get(HTTPClient).then(res => {
      setBuildings(res);
    });
  }, []);

  if (Object.keys(organizers).length === 0 || Object.keys(buildings).length === 0) {
    return (<div />); // TODO: Render a loading thingie
  }

  const columns = [
    { key: "first_name", title: "First Name", dataType: DataType.String, editor: PrimaryTextareaEditor },
    { key: "last_name", title: "Last Name", dataType: DataType.String },
    { key: "address", title: "Address", dataType: DataType.String, editor: ReferenceEditorClosure(buildings, ReferenceEditorMappings.BUILDING), formatter: formatLookup(buildings, formatAddress) },
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
      editor: PhoneEditor,
      formatter: formatPhoneNumber
    },
    {
      key: "organizer",
      title: "Organizer",
      dataType: DataType.String,
      editor: ReferenceEditorClosure(organizers, ReferenceEditorMappings.ORGANIZER),
      formatter: formatLookup(organizers, formatOrganizer)
    },
    { key: "editColumn", style: { width: 75 } },
  ];
  const reqs = [CRUDTableReqs.BUILDINGS, CRUDTableReqs.ORGANIZERS];
  const route = "contacts";
  const model = "contacts";
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };
  
  return (
    <CRUDTable
      model={model}
      route={route}
      reqs={reqs}
      columns={columns}
      DetailsRow={DetailsRow}
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
  const route = "buildings";
  const model = "buildings";
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      model={model}
      route={route}
      reqs={reqs}
      columns={columns}
      DetailsRow={DetailsRow}
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
  const route = "organizers";
  const model = "organizers";
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      model={model}
      route={route}
      reqs={reqs}
      columns={columns}
      DetailsRow={DetailsRow}
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
  const route = "events";
  const model = "events";
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      model={model}
      route={route}
      reqs={reqs}
      columns={columns}
      DetailsRow={DetailsRow}
    />
  );
};

export const CallEffortTable = (props) => {
  const columns = [
    { key: "name", title: "Name", dataType: DataType.String },
    { key: "created_at", title: "Date Created", dataType: DataType.String },
    { key: "editColumn", style: { width: 75 } },
  ]
  const reqs = [];
  const route = "efforts/calls";
  const model = "efforts/calls";
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      model={model}
      route={route}
      reqs={reqs}
      columns={columns}
      DetailsRow={CallEffortActivitiesTable}
    />
  );
};

export const CallEffortActivitiesTable = (props) => {
  const [callActivityCodes, setCallActivityCodes] = useState({});
  const [buildings, setBuildings] = useState({});

  useEffect(() => {
    CRUDTableReqs.ACTIVITYCODES.get(HTTPClient).then(res => {
      setCallActivityCodes(res);
    });

    CRUDTableReqs.BUILDINGS.get(HTTPClient).then(res => {
      setBuildings(res);
    });
  }, []);

  if (Object.keys(callActivityCodes).length === 0 && Object.keys(buildings).length === 0) {
    return (<div />); // TODO: Render a loading thingie
  }

  const callActivityCodesEditor = (props) => {
    const options = callActivityCodes['CALL'].concat(callActivityCodes['FORECASTED ATTENDANCE']);
    return (<OptionEditor {...props} options={options} />)
  }

  const columns = [
    { key: "contact__first_name", title: "First Name", dataType: DataType.String },
    { key: "contact__last_name", title: "Last Name", dataType: DataType.String },
    { key: "contact__address", 
      title: "Address", 
      dataType: DataType.String,
      editor: ReferenceEditorClosure(buildings, ReferenceEditorMappings.BUILDING),
      formatter: formatLookup(buildings, formatAddress)
    },
    { 
      key: "contact__phone_number", 
      title: "Phone Number", 
      dataType: DataType.String 
    },
    { key: "contact__email_address", title: "Email Address", dataType: DataType.String },
    { key: "status", title: "Status", dataType: DataType.String, editor: callActivityCodesEditor },
    { key: "notes", title: "Notes", dataType: DataType.String },
    { key: "editColumn", style: { width: 75 } },
  ];


  const reqs = [CRUDTableReqs.CONTACTS, CRUDTableReqs.BUILDINGS];
  const route = `efforts/calls/${props.rowData.id}`;
  const model = `efforts/calls`;
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      model={model}
      route={route}
      reqs={reqs}
      columns={columns}
      DetailsRow={DetailsRow}
    />
  );
};

