import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMeasurementHeight } from 'interface/IMeasurementBase';
import { IPantMeasurement } from 'interface/IPantMeasurement';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';

const state: IShirtMeasurement | IPantMeasurement = {
  fullName: '',
  height: null,
  inch: null,
  sleevLength: null,
  shoulderWidth: null,
  chestAround: null,
  stomach: null,
  bicepAround: null,
  torsoLength: null,
  hips: null,
  wrist: null,
  weight: null,
  age: null,
  unite: 'feet',
  neck: null
};

const stateError: IShirtMeasurement | IPantMeasurement = {
  fullName: null,
  height: null,
  inch: null,
  sleevLength: null,
  shoulderWidth: null,
  chestAround: null,
  stomach: null,
  bicepAround: null,
  torsoLength: null,
  hips: null,
  wrist: null,
  weight: null,
  age: null,
  unite: null,
  neck: null
};

interface IMeasurement {
  data: IShirtMeasurement | IPantMeasurement;
  errors: IShirtMeasurement | IPantMeasurement;
}
export interface IPayloadMeasurment {
  key: keyof IShirtMeasurement | keyof IPantMeasurement;
  value: any;
}

const initialState: IMeasurement = {
  data: state,
  errors: stateError,
};

interface IUpdateHeight {
  key: keyof IMeasurementHeight;
  value: number | null;
}

const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    updateMeasurementAction: (state: IMeasurement, action: PayloadAction<IPayloadMeasurment>) => {
      const { key, value } = action.payload;
      // return { ...state, [key]: value };
      return {
        ...state,
        data: {
          ...state.data,
          [key]: value,
        },
      };
    },
    updateMeasurementErrorAction: (
      state: IMeasurement,
      action: PayloadAction<IPayloadMeasurment>
    ) => {
      const { key, value } = action.payload;
      return {
        ...state,
        errors: {
          ...state.errors,
          [key]: value,
        },
      };
    },
    updateErrors: (state: IMeasurement, action: PayloadAction<IShirtMeasurement | IPantMeasurement>) => {
      const {payload} = action;
      return {
        ...state,
        errors: {
          ...payload
        }
      }
    },
    
  },
});

export const { updateMeasurementAction, updateMeasurementErrorAction, updateErrors } = measurementSlice.actions;

export default measurementSlice.reducer;
