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

export const ReferenceEditor = ({ column, rowKeyValue, dispatch, value, route, mapping }) => {
  const [objects, setObjects] = useState([]);
  console.log(route);
  console.log(mapping);
  useEffect(() => {
    api
      .get(`http://localhost:8000/${route}`)
      .then((res) => {
        console.log(res.data);
        setObjects(
          res.data.map(mapping)
        );
        console.log(objects);
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
        {objects.map((object) => (
          <option key={object.id} value={object.id}>
            {object.display}
          </option>
        ))}
      </select>
    </div>
  );
};
