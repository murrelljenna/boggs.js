import { isValidPhoneNumber } from 'react-phone-number-input'

export const FieldLimits = {
    FIRSTNAME: 30,
    LASTNAME: 30,
    EMAILADDRESS: 30,
    UNITNUMBER: 4,
    PHONENUMBER: 30,
}

const ValidationErrorMessages = {
    CHARLIMIT: 'Character limit reached.',
    EMAILFORMAT: 'Invalid email address.',
    PHONEFORMAT: 'Invalid phone number.',
}

/* Validators
 * These functions take a value and validate it. They are primarily used by
 * DataTable instances in Tables.js to validate specific columns on the 
 * front-end.
 */

export const EmailValidator = (value) => {
    if (value.length > FieldLimits.EMAILADDRESS) {
        return ValidationErrorMessages.CHARLIMIT;
    } else if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return ValidationErrorMessages.EMAILFORMAT;
    }
}

export const PhoneValidator = (value) => {
    console.log(value);
    if (!isValidPhoneNumber(value)) {
        return ValidationErrorMessages.PHONEFORMAT;
    }
}

export const AllValidators = ({column, value}) => {
  if (column.key == "email_address") {
    if (EmailValidator(value)) {
      return EmailValidator(value);
    }
  } else if (column.key == "phone_number") {
    if (PhoneValidator(value)) {
      return PhoneValidator(value);
    }
  }
}
