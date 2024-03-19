import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { defaultCuffModel, defaultFebric } from 'config/default';

const modelProperties = {
  collar: {
    id: null,
    modelURL: defaultFebric,
    price: 0,
    title: '',
  },
  cuff: {
    id: null,
    modelURL: defaultCuffModel,
    price: 0,
    title: '',
  },
  chestpocket: {
    id: 13,
    modelURL: defaultCuffModel,
    price: 0,
    title: '',
  }
  // checkpocket: {
  //   id: 13,
  //   modelURL: 'URL for the model to load',
  // },
} as const;

type ModelType = typeof modelProperties;

export type ModelKeys = keyof ModelType;

export interface UpdateModelAction {
  key: ModelKeys;
  payload: RowType;
}

export type RowType = {
  id: number | null;
  modelURL: string;
  price: number;
  title?: string;
  originalImageUrl?: string;
  code?: string;
  label?: string;
  season?: string;
  material?: string;
  tone?: string;
  febricTypes?: string;
};

export type IModelAction = Record<ModelKeys, RowType>;

const initialState: IModelAction = {
  collar: {
    id: 12,
    modelURL: `/models/collars/collar-1.glb?timestamp=${Date.now()}`,
    price: 0,
    title: 'Default collar model',
    label: 'default',
    code: 'default',
  },
  cuff: {
    id: 12,
    modelURL: `${defaultCuffModel}?timestamp=${Date.now()}`,
    price: 0,
    title: 'default cuff model',
    label: 'default',
    code: 'default',
  },
  chestpocket: {
    id: null,
    modelURL: '',
    price: 0,
    
  }
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    updateModel: (state: IModelAction, action: PayloadAction<UpdateModelAction>) => {
      return {
        ...state,
        [action.payload.key]: action.payload.payload,
      };
    },
    updateAllProps: (state: IModelAction, action: PayloadAction<IModelAction>) => {
      const { ...rest } = action.payload;
      // console.log('action.payload', action.payload)
      return { ...state, ...rest };
    },
  },
});

export const { updateModel, updateAllProps } = modelSlice.actions;
export default modelSlice.reducer;
