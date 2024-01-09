import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IPantMeasurement } from 'interface/IPantMeasurement';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';

const state: IShirtMeasurement | IPantMeasurement = {
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
  weight: 0,
  age: 0
};

interface IMeasurement {
  data: IShirtMeasurement | IPantMeasurement;
  errors: any;
}
export interface IPayloadMeasurment {
  key: keyof IShirtMeasurement | keyof IPantMeasurement;
  value: any;
}

const initialState:IMeasurement = {
  data: state,
  errors: null
}


const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    updateMeasurementAction: (
      state: IMeasurement,
      action: PayloadAction<IPayloadMeasurment>
    ) => {
      const { key, value } = action.payload;
      // return { ...state, [key]: value };
      return {
        ...state,
        data: {
          ...state.data,
          [key]:value
        }
      }
    },
  },
});

export const { updateMeasurementAction } = measurementSlice.actions;

export default measurementSlice.reducer;
