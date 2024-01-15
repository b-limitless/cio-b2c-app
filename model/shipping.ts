import { validString } from 'regrex';

export const ShippingModel = {
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
};
