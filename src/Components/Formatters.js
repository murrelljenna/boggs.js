export const formatAddress = address => `${address.street_number} ${address.street_name}`; 

export const formatOrganizer = organizer => `${organizer.first_name} ${organizer.last_name}`;

export const formatLookup = (data, mapping) => key => mapping(data[key]) 

const CRUDTableFormat = ({column, value}) => {
    if (column.formatter && value) {
      return column.formatter(value);
    }
  }

export default CRUDTableFormat;
