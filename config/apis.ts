export const BASE_URI = 'http://localhost:8000';
export const API_PRIFIX = 'api';
export const REQUEST_BASE_URI = `${BASE_URI}/${API_PRIFIX}`;
export const productBaseURI = `${REQUEST_BASE_URI}/products`;
export const cart = `${REQUEST_BASE_URI}/cart`;
export const customer = `${REQUEST_BASE_URI}/customer`;

export const APIS = {
  upload: `${productBaseURI}/v1/upload`,
  product: `${productBaseURI}/v1`,
  customer: {
    signup: `${customer}/signup`, 
    signin: `${customer}/signin`, 
    currentUser:`${customer}/currentCustomer`, 
  },
  cart
};
