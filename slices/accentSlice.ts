// Basically it will store the different part of
// Model which is febric customizable
// For example in accent we have collor defualt, all, inner
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultFebric } from 'config/default';
import { defaultPrices } from 'config/models';

export type TCollarAccent = 'default' | 'all' | 'innerFebric'; // can extends for cuff as well
export type TModelNavigation = 'febrics' | 'styles' | 'accents';

export type TBase = {
  id: number | string;
  meshName: string[];
  febric: string;
  updatedFrom: TModelNavigation;
  price: number;
  code?: string
  label?:string;
  season?:string;
};
export type TCollar = {
  type: TCollarAccent;
} & TBase;

export interface IAccentGlobal {
  collar: TCollar;
  cuff: TCollar;
}
export const accentProperties: IAccentGlobal = {
  collar: {
    id: 12,
    // Iterate through the mesh name and apply the selected febric to that mesh
    meshName: [], //'because it can be combining all or inner',
    febric: defaultFebric,
    type: 'default',
    updatedFrom: 'febrics',
    price: defaultPrices.collar
  },

  cuff: {
    id: 12,
    // Iterate through the mesh name and apply the selected febric to that mesh
    meshName: [], //'because it can be combining all or inner',
    febric: defaultFebric,
    type: 'default',
    updatedFrom: 'febrics',
    price: defaultPrices.cuff
  },
};

type ModelType = typeof accentProperties;
type ModelKeys = keyof ModelType;

export interface UpdateAccentAction {
  key: ModelKeys;
  payload: TCollar;
}

export interface UpdateAccentActionType {
  key: ModelKeys;
  payload: {
    type: TCollar['type'];
    meshName: TBase['meshName'];
  };
}

export type IModelAction = Record<ModelKeys, TCollar>;

const initialState: IModelAction = {
  collar: {
    id: 12,
    febric: defaultFebric,
    type: 'default',
    meshName: [],
    updatedFrom: 'febrics',
    price: defaultPrices.collar
  },
  cuff: {
    id: 12,
    febric: defaultFebric,
    type: 'default',
    meshName: [],
    updatedFrom: 'febrics',
    price: defaultPrices.cuff
  },
};

const accentSlice = createSlice({
  name: 'accent',
  initialState,
  reducers: {
    updateAccent: (state: IAccentGlobal, action: PayloadAction<UpdateAccentAction>) => {
      return {
        ...state,
        [action.payload.key]: action.payload.payload,
      };
    },
    updateAccentType: (state: IAccentGlobal, action: PayloadAction<UpdateAccentActionType>) => {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          type: action.payload.payload.type,
          meshName: action.payload.payload.meshName,
        },
      };
    },
  },
});

export const { updateAccent, updateAccentType } = accentSlice.actions;
export default accentSlice.reducer;
