import { formatPhoneNumber } from "react-phone-number-input";

export const formatPhone = number => formatPhoneNumber(number);

export const formatAddress = address => `${address.street_number} ${address.street_name}`; 

export const formatOrganizer = organizer => `${organizer.first_name} ${organizer.last_name}`;

const formatter = (references) => {
  return ({column, value}) => {
    switch (column.key) {
      case 'phone_number':
        return formatPhone(value);
      case 'address':
        let building = references.buildings[value];
        return building ? formatAddress(building) : value
      case 'organizer':
        let organizer = references.organizers[value];
        return organizer ? formatOrganizer(organizer) : value;
    }
  }
}

export default formatter;
