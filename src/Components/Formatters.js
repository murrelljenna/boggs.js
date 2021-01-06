import { formatPhoneNumber } from "react-phone-number-input";

export const formatPhone = number => formatPhoneNumber(number);

export const formatAddress = address => `${address.street_number} ${address.street_name}`; 

export const formatOrganizer = organizer => `${organizer.first_name} ${organizer.last_name}`;
