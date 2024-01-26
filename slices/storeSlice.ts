import { PayloadAction, createSlice } from '@reduxjs/toolkit';


export interface IModeType {
  storeId: string | null;
}

const initialState: IModeType = {
  storeId: null,
};

const storeSlice = createSlice({
  name: 'modelType',
  initialState,
  reducers: {
    updateStoreIdAction: (state: IModeType, action: PayloadAction<null | string>) => {
      return { ...state, storeId: action.payload };
    },
  },
});

export const {updateStoreIdAction} = storeSlice.actions;
export default storeSlice.reducer;