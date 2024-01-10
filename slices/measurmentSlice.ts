import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMeasurementHeight } from 'interface/IMeasurementBase';
import { IPantMeasurement } from 'interface/IPantMeasurement';
import { IShirtMeasurement } from 'interface/IShirtMeasurement';

const state: IShirtMeasurement | IPantMeasurement = {
  fullName: '',
  height: {
    feet: 0,
    inch: 0
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

const stateError: IShirtMeasurement | IPantMeasurement = {
  fullName: null,
  height: {
    feet: null, 
    inch: null
  },
  sleevLength: null,
  shoulderWidth: null,
  chestAround: null,
  stomach: null,
  bicepAround: null,
  torsoLength: null,
  hips: null,
  wrist: null,
  weight: null,
  age: null
};

interface IMeasurement {
  data: IShirtMeasurement | IPantMeasurement;
  errors: IShirtMeasurement | IPantMeasurement;
}
export interface IPayloadMeasurment {
  key: keyof IShirtMeasurement | keyof IPantMeasurement;
  value: any;
}

const initialState:IMeasurement = {
  data: state,
  errors: stateError
}

interface IUpdateHeight {
  key: keyof IMeasurementHeight;
  value: number | null;
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
    updateMeasurementErrorAction: (
      state: IMeasurement,
      action: PayloadAction<IPayloadMeasurment>
    ) => {
      const { key, value } = action.payload;
      // return { ...state, [key]: value };
      return {
        ...state,
        errors: {
          ...state.data,
          [key]:value
        }
      }
    },
    updateHeightAction: (
      state: IMeasurement,
      action: PayloadAction<IUpdateHeight>
    ): IMeasurement => {
      const { key, value } = action.payload;
      
      return {
        ...state,
        data: {
          ...state.data,
          //@ts-ignore
          height: {
            ...state.data.height,
            [key]: value,
          },
        },
      };
    }
  },
});

export const { updateMeasurementAction, updateMeasurementErrorAction } = measurementSlice.actions;

export default measurementSlice.reducer;
