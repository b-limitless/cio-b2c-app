import { validDigit, validString, validUnite } from 'regrex';

export const user = {
  fullName: validString,
  height: validDigit,
  weight: validDigit,
  age: validDigit,
  inch: validDigit,
  unite: validUnite,
};
