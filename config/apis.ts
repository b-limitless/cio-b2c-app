export const BASE_URI = 'http://localhost:8000';
export const API_PRIFIX = 'api';
export const REQUEST_BASE_URI = `${BASE_URI}/${API_PRIFIX}`;
export const productBaseURI = `${REQUEST_BASE_URI}/products`;
export const cart = `${REQUEST_BASE_URI}/cart`;
export const auth = `${REQUEST_BASE_URI}/auth`;

export const APIS = {
  upload: `${productBaseURI}/v1/upload`,
  product: `${productBaseURI}/v1`,
  auth: {
    signup: `${auth}/signup`, 
    signin: `${auth}/signin`, 
  },
  cart
};
