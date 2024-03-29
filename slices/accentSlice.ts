// Basically it will store the different part of
// Model which is febric customizable
// For example in accent we have collor defualt, all, inner
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultFebric } from 'config/default';
import { EAccentChildrens, defaultPrices } from 'config/models';

export type TCollarAccent = 'default' | 'all' | 'innerFebric'; // can extends for cuff as well
export type TModelNavigation = 'febrics' | 'styles' | 'accents';

export type TBase = {
  id: number | string;
  meshName?: string[];
  febric: string;
  updatedFrom?: TModelNavigation;
  price: number;
  code?: string;
  label?: string;
  season?: string;
  type?: TCollarAccent;
  texture?: string;
  title?: string;
};

export interface IAccentGlobal {
  collar: TBase;
  cuff: TBase;
  buttonWholeAndStitch: TBase;
  buttonColors: TBase;
}

export const accentProperties: IAccentGlobal = {
  collar: {
    id: 12,
    // Iterate through the mesh name and apply the selected febric to that mesh
    meshName: [], //   'because it can be combining all or inner',
    febric: defaultFebric,
    type: 'default',
    updatedFrom: 'febrics',
    price: defaultPrices.collar,
  },

  cuff: {
    id: 12,
    // Iterate through the mesh name and apply the selected febric to that mesh
    meshName: [], //'because it can be combining all or inner',
    febric: defaultFebric,
    type: 'default',
    updatedFrom: 'febrics',
    price: defaultPrices.cuff,
  },
  buttonWholeAndStitch: {
    id: 1,
    febric: '',
    price: defaultPrices.cuff,
  },
  buttonColors: {
    id: '2',
    title: 'Black',
    texture: `/img/buttons/texture/black.png`,
    price: 0,
    febric: `/img/buttons/icon/black.png`,
  },
};

type ModelType = typeof accentProperties;
type ModelKeys = keyof ModelType;

export interface UpdateAccentAction {
  key: ModelKeys;
  payload: TBase;
}

export interface UpdateAccentActionType {
  key: ModelKeys;
  payload: {
    type: TBase['type'];
    meshName: TBase['meshName'];
  };
  childCode?: EAccentChildrens;
}

export type TAccent = Record<ModelKeys, TBase>; // expecting RowType

const initialState: TAccent = {
  collar: {
    id: 12,
    febric: defaultFebric,
    type: 'default',
    meshName: [],
    updatedFrom: 'febrics',
    price: defaultPrices.collar,
  },
  cuff: {
    id: 12,
    febric: defaultFebric,
    type: 'default',
    meshName: [],
    updatedFrom: 'febrics',
    price: defaultPrices.cuff,
  },
  buttonWholeAndStitch: {
    id: '',
    febric: '/img/button-threads/thread-black.png',
    price: defaultPrices.cuff,
  },
  buttonColors: {
    id: '2',
    title: 'Black',
    texture: `/img/buttons/texture/black.png`,
    price: 0,
    febric: `/img/buttons/icon/black.png`,
  },
};

const accentSlice = createSlice({
  name: 'accent',
  initialState,
  reducers: {
    updateAccent: (state: IAccentGlobal, action: PayloadAction<UpdateAccentAction>) => {
      console.log(action.payload.key, action.payload.key);
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
    updateAllAccent: (state: IAccentGlobal, action: PayloadAction<TAccent>) => {
      const { ...rest } = action.payload;

      return { ...state, ...rest };
    },
  },
});

export const { updateAccent, updateAccentType, updateAllAccent } = accentSlice.actions;
export default accentSlice.reducer;
