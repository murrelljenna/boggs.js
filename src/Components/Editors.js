import { updateEditorValue } from "ka-table/actionCreators";

import { useEffect, useState } from "react";
import axios from "axios";

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

export const AddressEditor = ({ column, rowKeyValue, dispatch, value }) => {
  const [buildings, setBuildings] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/buildings/")
      .then((res) => {
        setBuildings(
          JSON.parse(res.data).map((building) => ({
            address: `${building.fields.street_number} ${building.fields.street_name}`,
            id: building.pk,
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
