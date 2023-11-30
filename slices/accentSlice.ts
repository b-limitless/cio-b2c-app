// Basically it will store the different part of
// Model which is febric customizable
// For example in accent we have collor defualt, all, inner
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultFebric } from 'config/default';

type TCollarAccent = 'default' | 'all' | 'innerFebric'; // can extends for cuff as well

export type TBase = {
  id: number | string;
  meshName: string[];
  febric: string;
};
export type TCollar = {
  type: TCollarAccent;
} & TBase;

interface IAccentGlobal {
  collar: TCollar;
}
const accentProperties: IAccentGlobal = {
  collar: {
    id: 12,
    // Iterate through the mesh name and apply the selected febric to that mesh
    meshName: [], //'because it can be combining all or inner',
    febric: defaultFebric,
    type: 'default',
  },
};

type ModelType = typeof accentProperties;
type modelKeys = keyof ModelType;
type ModelKeys = keyof ModelType;

export interface UpdateAccentAction {
  key: modelKeys;
  payload: TCollar;
}

// export type RowType = {
//   id: number;
//   model: string;
//   price: number;
// };

type ModelActionInterface = Record<ModelKeys, TCollar>;

const initialState: ModelActionInterface = {
  collar: {
    id: 12,
    febric: defaultFebric,
    type: 'default',
    meshName: ['test'],
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
  },
});

export const { updateAccent } = accentSlice.actions;
export default accentSlice.reducer;
