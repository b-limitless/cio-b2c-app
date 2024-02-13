import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export interface IPayment {
  type: string | null;
  error: null | string;
}

const initialState: IPayment = {
  type: null,
  error: null
};

const storeSlice = createSlice({
  name: 'modelType',
  initialState,
  reducers: {
    updatePaymentType: (state: IPayment, action: PayloadAction<null | string>) => {
      return { ...state, type: action.payload };
    },
    updatePaymentError: (state: IPayment, action: PayloadAction<null | string>) => {
        return { ...state, error: action.payload };
    },
  },
});

export const {updatePaymentType} = storeSlice.actions;
export default storeSlice.reducer;