import { AllValidators } from "../Validators.js"
import formatter from "../Formatters.js"
import { SortingMode, FilteringMode } from "ka-table/enums";
import {
  AddButton,
  EditButton,
  SaveNewRowButton,
  SaveButton,
} from "./Buttons/Buttons.js";
import { CustomLookupEditor, NumberEditor, DateEditor } from "../FilterEditors.js"
import { PhoneEditor, PrimaryTextareaEditor, ReferenceEditor } from "../Editors.js";
import { updateFilterRowOperator, updateFilterRowValue } from 'ka-table/actionCreators';

const GetCRUDTableProps = (references) => ({
  data: [],
  validation: AllValidators, 
  format: formatter(references),
  columns: [],
  rowKeyField: "id",
  loading: {
    enabled: false,
    text: "Loading Data..",
  },
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow,
  childComponents:{
    cellText: {
      content: (props) => {
        if (props.column.key === "editColumn") {
          return <EditButton {...props} />;
        }
      },
    },
    cellEditor: {
      content: ((references) => {
        return (props) => {
          if (props.column.key === "editColumn") {
            // If this is a new row (without a rowkeyvalue), lets use a different save button
            if (JSON.stringify(props.rowKeyValue) === "{}") {
              return <SaveNewRowButton {...props} />;
            } else {
              return <SaveButton {...props} />;
            }
          } else if (props.column.key === "address") {
            return <ReferenceEditor {...props} data={references.buildings} mapping={(building) => ({
                display: `${building[1].street_number} ${building[1].street_name}`,
                id: building[1].id,
              })}/>;
          } else if (props.column.key === "organizer") {
            return <ReferenceEditor {...props} data={references.organizers} mapping={(object) => ({
              display: `${object[1].first_name} ${object[1].last_name}`,
              id: object[1].id,
            })}/>;
          } else if (props.column.key === "first_name") {
            return <PrimaryTextareaEditor {...props} />;
          } else if (props.column.key === "phone_number") {
            return <PhoneEditor {...props} />
          }
        }
      })(references),
    },
    headCell: {
      content: (props) => {
        if (props.column.key === "editColumn") {
          return <AddButton {...props} />;
        }
      },
    },
    filterRowCell: {
        content: (props) => {
          switch (props.column.key){
            case 'passed': return <CustomLookupEditor {...props}/>;
            case 'first_name': return <></>;
            case 'last_name': return <></>;
            case 'score': return <NumberEditor {...props}/>;
            case 'nextTry': return <DateEditor {...props}/>;
          }
        }
      }
  }
});

export default GetCRUDTableProps;
