import { AllValidators } from "../Validators.js"
import CRUDTableFormat from "../Formatters.js"
import { SortingMode, FilteringMode } from "ka-table/enums";
import {
  AddButton,
  EditButton,
  SaveNewRowButton,
  SaveButton,
} from "./Buttons/Buttons.js";
import { CustomLookupEditor, NumberEditor, DateEditor } from "../FilterEditors.js"
import { updateFilterRowOperator, updateFilterRowValue, hideDetailsRow, showDetailsRow } from 'ka-table/actionCreators';
const GetCRUDTableProps = (DetailsRow) => ({
  data: [],
  validation: AllValidators, 
  format: CRUDTableFormat,
  columns: [],
  rowKeyField: "id",
  loading: {
    enabled: false,
    text: "Loading Data..",
  },
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow,
  childComponents:{
    dataRow: {
      elementAttributes: (() => {
        let detailsShown = false;
        return () => ({
          onClick: (event, extendedEvent) => {
            if (detailsShown) {
              extendedEvent.dispatch(showDetailsRow(extendedEvent.childProps.rowKeyValue));
            } else {
              extendedEvent.dispatch(hideDetailsRow(extendedEvent.childProps.rowKeyValue));
            }
            detailsShown = !detailsShown;
          },
        })
      })()
    },
    detailsRow: {
      elementAttributes: () => ({
        style: {
          backgroundColor: '#eee'
        }
      }),
      content: DetailsRow
    },
    cellText: {
      content: (props) => {
        if (props.column.key === "editColumn") {
          return <EditButton {...props} />;
        }
      },
    },
    cellEditor: {
      content: (props) => {
        if (props.column.editor) {
          return props.column.editor(props);
        } else if (props.column.key === "editColumn") {
          // If this is a new row (without a rowkeyvalue), lets use a different save button
          if (JSON.stringify(props.rowKeyValue) === "{}") {
            return <SaveNewRowButton {...props} />;
          } else {
            return <SaveButton {...props} />;
          }
        }
      },
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
