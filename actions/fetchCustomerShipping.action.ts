import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIS, shipping } from 'config/apis';
import { request } from 'utils/request';


export const fetchCustomerShipping = createAsyncThunk(
  'users/fetchShipping',
  async () => {
        const response = await request({
      url: shipping,
      method: 'get',
    });
    return response;
  },
)