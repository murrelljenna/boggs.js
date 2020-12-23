import { updateEditorValue } from "ka-table/actionCreators";

import { useEffect, useState } from "react";
import api from "../utils/api.js";

export const PrimaryTextareaEditor = ({
  column,
  rowKeyValue,
  dispatch,
  value,
}) => {
  const [editorValue, setValue] = useState(value);

  return (
    <input
      type="text"
      autoFocus
      value={editorValue}
      className="ka-input"
      id="w3review"
      name="w3review"
      onBlur={() => {
        dispatch(updateEditorValue(rowKeyValue, column.key, editorValue));
      }}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    ></input>
  );
};

export const OrganizerEditor = ({ column, rowKeyValue, dispatch, value }) => {
  const [organizers, setOrganizers] = useState([]);
  useEffect(() => {
    api
      .get("http://localhost:8000/organizers/")
      .then((res) => {
        console.log(res.data);
        setOrganizers(
          res.data.map((organizer) => ({
            display: `${organizer.first_name} ${organizer.last_name}`,
            id: organizer.id,
          }))
        );
        console.log(organizers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [editorValue, setValue] = useState(value);
    console.log(organizers);
  return (
    <div>
      <select
        value={editorValue}
        className="ka-input"
        onBlur={() => {
          dispatch(updateEditorValue(rowKeyValue, column.key, editorValue));
        }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      >
        {organizers.map((organizer) => (
          <option key={organizer.id} value={organizer.id}>
            {organizer.display}
          </option>
        ))}
      </select>
    </div>
  );
};

export const AddressEditor = ({ column, rowKeyValue, dispatch, value }) => {
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    api
      .get("http://localhost:8000/buildings/")
      .then((res) => {
        setBuildings(
          res.data.map((building) => ({
            address: `${building.street_number} ${building.street_name}`,
            id: building.id,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [editorValue, setValue] = useState(value);

  return (
    <div>
      <select
        value={editorValue}
        className="ka-input"
        onBlur={() => {
          dispatch(updateEditorValue(rowKeyValue, column.key, editorValue));
        }}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      >
        {buildings.map((building) => (
          <option key={building.id} value={building.id}>
            {building.address}
          </option>
        ))}
      </select>
    </div>
  );
};
