import { validDigit, validString, validUnite } from 'regrex';

export const user = {
  fullName: validString,
  height: validDigit,
  weight: validDigit,
  age: validDigit,
  feet: validDigit,
  inch: validDigit,
  unite: validUnite,
  cm: validDigit
};
