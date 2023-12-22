export const BASE_URI = 'http://pasal.dev';
export const API_PRIFIX = 'api';
export const REQUEST_BASE_URI = `${BASE_URI}/${API_PRIFIX}`;
export const productBaseURI = `${REQUEST_BASE_URI}/products`;

export const APIS = {
  product: {
    upload: `${productBaseURI}/v1/upload`,
    new: `${productBaseURI}/v1`,
  },
};
