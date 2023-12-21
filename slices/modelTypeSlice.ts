import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type TMode = 'shirt' | 'pant' | 'suit';

export interface IModeType {
  modelType: TMode;
}

const initialState: IModeType = {
  modelType: 'pant',
};

const modelTypeSlice = createSlice({
  name: 'modelType',
  initialState,
  reducers: {
    updaetModelType: (state: IModeType, action: PayloadAction<TMode>) => {
      return { ...state, modelType: action.payload };
    },
  },
});

export const {updaetModelType} = modelTypeSlice.actions;
export default modelTypeSlice.reducer;