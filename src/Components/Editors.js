import { updateEditorValue } from "ka-table/actionCreators";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';

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
      onBlur={() => {
        dispatch(updateEditorValue(rowKeyValue, column.key, editorValue));
      }}
      onChange={(event) => {
        setValue(event.target.value);
      }}
    ></input>
  );
};

export const PhoneEditor = ({ column, rowKeyValue, dispatch, value, route, mapping }) => {
  const [editorValue, setValue] = useState(value);
  console.log(editorValue);
    
  return (
    <PhoneInput
      className="ka-input"
      defaultCountry={'CA'}
      value={editorValue}
      onChange={setValue}

      onBlur={() => {
        dispatch(updateEditorValue(rowKeyValue, column.key, editorValue));
      }}
    />
  );
}

export const ReferenceEditor = ({ column, rowKeyValue, dispatch, value, mapping, data }) => {
  let mappedData = Object.entries(data).map(mapping);

  const [editorValue, setValue] = useState(value);
  return (
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
        {mappedData.map(object => (
          <option key={object.id} value={object.display}>
            {object.display}
          </option>
        ))}
      </select>
  );
};
