import { updateEditorValue } from "ka-table/actionCreators";
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input/input';

import { useState } from "react";

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
          <option key={object.id} value={object.id}>
            {object.display}
          </option>
        ))}
      </select>
  );
};
/*
const CustomLookupEditor = ({
  column, dispatch,
}) => {
  const toNullableBoolean = (value) => {
    switch (value) {
      case 'true': return true;
      case 'false': return false;
    }
    return value;
  };
  return (
    <div>
      <select
        className='form-control'
        defaultValue={column.filterRowValue}
        onChange={(event) => {
          dispatch(updateFilterRowValue(column.key, toNullableBoolean(event.currentTarget.value)));
        }}>
        <option value=''/>
        <option value={'true'}>True</option>
        <option value={'false'}>False</option>
      </select>
    </div >
  );
};
*/

