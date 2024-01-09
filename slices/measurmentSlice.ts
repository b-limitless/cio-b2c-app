import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPantMeasurement } from 'interface/IPantMeasurement';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';

const initialState: IShirtMeasurement | IPantMeasurement = {
  fullName: '',
  height: {
    unite: 'inch',
    value: 0,
  },
  sleevLength: 0,
  shoulderWidth: 0,
  chestAround: 0,
  stomach: 0,
  bicepAround: 0,
  torsoLength: 0,
  hips: 0,
  wrist: 0,
};

export interface IPayloadMeasurment {
  key: keyof IShirtMeasurement | keyof IPantMeasurement;
  value: any;
}
const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    updateMeasurementAction: (
      state: IShirtMeasurement,
      action: PayloadAction<IPayloadMeasurment>
    ) => {
      const { key, value } = action.payload;
      return { ...state, [key]: value };
    },
  },
});

export const { updateMeasurementAction } = measurementSlice.actions;

export default measurementSlice.reducer;
