import { emailRegex, validString } from 'regrex';

export const shippingModel = {
  firstName: validString,
  lastName: validString,
  addressLine1: validString,
  addressLine2: validString,
  city: validString,
  state: validString,
  postalCode: validString,
  country: validString,
  phoneNumber: validString,
  countryCode: validString,
  email:emailRegex
};
