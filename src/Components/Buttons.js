import {
  showNewRow,
  openRowEditors,
  closeRowEditors,
  saveRowEditors,
  deleteRow,
  hideNewRow,
  saveNewRow,
} from "ka-table/actionCreators";

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Tooltip from '@material-ui/core/Tooltip';
import { getValueByColumn } from 'ka-table/Utils/DataUtils';
import IconButton from '@material-ui/core/IconButton';
import jsPDF from 'jspdf';
import 'jspdf-autotable'

export const AddButton = ({ dispatch }) => {
  return (
    <img
      tabIndex="0"
      autoFocus
      style={{'margin-right': 'auto', 'margin-left': 'auto', 'display': 'block'}}
      src="https://komarovalexander.github.io/ka-table/static/icons/plus.svg"
      alt="Add New Row"
      title="Add New Row"
      onClick={() => dispatch(showNewRow())}
    />
  );
};

export const EditButton = ({ dispatch, rowKeyValue }) => {
  return (
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/edit.svg"
        style={{'margin-right': 'auto', 'margin-left': 'auto', 'display': 'block'}}
        alt="Edit Row"
        title="Edit Row"
        onClick={() => {
          dispatch(openRowEditors(rowKeyValue));
        }}
      />
  );
};

export const SaveNewRowButton = ({ dispatch }) => {
  return (
    <div className="buttons">
      <img
        tabIndex="0"
        src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
        className="save-cell-button"
        alt="Save"
        title="Save"
        onClick={() => {
          dispatch(
            saveNewRow(-1, {
              validate: true,
            })
          );
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            dispatch(
              saveNewRow(-1, {
                validate: true,
              })
            );
          }
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/close.svg"
        className="close-cell-button"
        alt="Cancel"
        title="Cancel"
        onClick={() => dispatch(hideNewRow())}
      />
    </div>
  );
};

export const SaveButton = ({ dispatch, rowKeyValue, rowData }) => {
  return (
    <div
      className="buttons"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <img
        tabIndex="0"
        src="https://komarovalexander.github.io/ka-table/static/icons/save.svg"
        className="save-cell-button"
        alt="Save"
        title="Save"
        onClick={() => {
          dispatch(
            saveRowEditors(rowKeyValue, {
              validate: true,
              rowKeyValue: rowKeyValue,
            })
          );
        }}
        onKeyDown={(event) => {
          if (event.keyCode === 13) {
            dispatch(
              saveRowEditors(rowKeyValue, {
                validate: true,
                rowKeyValue: rowKeyValue,
              })
            );
          }
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/close.svg"
        className="close-cell-button"
        alt="Cancel"
        title="Cancel"
        onClick={() => {
          dispatch(closeRowEditors(rowKeyValue));
        }}
      />
      <img
        src="https://komarovalexander.github.io/ka-table/static/icons/delete.svg"
        className="delete-row-column-button"
        onClick={() => dispatch(deleteRow(rowKeyValue))}
        alt=""
      />
    </div>
  );
};

export const ExportPDFButton = (props) => {
  const { classes, tableProps } = props;

  const exportClick = orientation => {
    const doc = new jsPDF(orientation);
    const head = [tableProps.columns.map(c => c.title)];
    const body = tableProps.data.map(d =>
      tableProps.columns.map(c => getValueByColumn(d, c))
    );
    doc.autoTable({
      margin: 1,
      headStyles: { fillColor: "#F1F5F7", textColor: "#747D86" },
      alternateRowStyles: { fillColor: "#F9FBFC" },
      head,
      body
    });

    doc.save("table.pdf");
  };

  return (
    <Tooltip title="Export to PDF">
      <IconButton>
        <PictureAsPdfIcon 
          className={classes.block} 
          color="inherit" 
          onClick={() => exportClick()}
        />
      </IconButton>
    </Tooltip>
  );
}
