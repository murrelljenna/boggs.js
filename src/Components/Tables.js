import { DataType } from "ka-table/enums";
import CRUDTable from "./CRUDTable/CRUDTable.js";
import { OptionEditor, PhoneEditor, PrimaryTextareaEditor, ReferenceEditorClosure, ReferenceEditorMappings} from "./Editors.js";
import { useEffect, useState } from "react";
import { formatAddress, formatLookup, formatOrganizer } from "./Formatters.js";
import { formatPhoneNumber } from "react-phone-number-input";
import boggs, { asLookup } from "../api/boggs.js";

export const ContactsTable = (props) => {
  const [organizers, setOrganizers] = useState({});
  const [buildings, setBuildings] = useState({});
  const api = boggs.CONTACTS;

  useEffect(() => {
    boggs.ORGANIZERS.get().then(res => {
      setOrganizers(asLookup(res.data));
    });

    boggs.BUILDINGS.get().then(res => {
      setBuildings(asLookup(res.data));
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
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };
  
  return (
    <CRUDTable
      api={api}
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
  const api =  boggs.BUILDINGS
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      api={api}
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
  const api = boggs.ORGANIZERS;
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      api={api}
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
  const api = boggs.EVENTS;
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      api={api}
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

  const api = boggs.CALLEFFORTS;

  return (
    <CRUDTable
      api={api}
      columns={columns}
      DetailsRow={CallEffortActivitiesTable}
    />
  );
};

export const CallEffortActivitiesTable = (props) => {
  const [callActivityCodes, setCallActivityCodes] = useState({});
  const [buildings, setBuildings] = useState({});

  useEffect(() => {
    boggs.ACTIVITYCODES.get().then(res => {
      setCallActivityCodes(res);

      boggs.BUILDINGS.get().then(res => {
        setBuildings(asLookup(res.data));
      });
    });
  }, []);

  if (Object.keys(callActivityCodes).length === 0 || Object.keys(buildings).length === 0) {
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

  const api = boggs.CALLEFFORTACTIVITIES
  const getClosure = () => api.get(props.rowData.id);
  const apiWrapper = {
    get: getClosure,
    patch: api.patch,
    post: api.post,
    delete: api.delete
  }
  const DetailsRow = () => {
    return (
      <p>TODO: Make this a thing</p>
    );  
  };

  return (
    <CRUDTable
      api={apiWrapper}
      columns={columns}
      DetailsRow={DetailsRow}
    />
  );
};

