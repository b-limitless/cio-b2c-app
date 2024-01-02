import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { defaultCuffModel, defaultFebric } from 'config/default';

const modelProperties = {
  collar: {
    id: 12,
    model: defaultFebric,
    price: 0,
    title: '', 
    
  },
  febric: {
    id: 12, 
    model: defaultFebric, 
    price: 0,
    title: '', 
    
  },
  cuff: {
    id: 13,
    model: defaultCuffModel,
    price: 0,
    title: '',
   
  },
  // sleeves: {
  //   id: 13,
  //   model: 'URL for the model to load',
  // },
  // checkpocket: {
  //   id: 13,
  //   model: 'URL for the model to load',
  // },
} as const;

type ModelType = typeof modelProperties;

export type ModelKeys = keyof ModelType;

export  interface UpdateModelAction {
  key: ModelKeys;
  payload: RowType;
}

export type TRestFebric = {
  title: string;
  price: number;
  material?: string;
  tone?: string;
  febricTypes?: string;
}

export type RowType = {
  id: number;
  model: string;
  price: number;
  title: string;
  originalImageUrl?:string;
  code?: string
  label?:string;
  season?:string;
  
} & TRestFebric;

type IModelAction = Record<ModelKeys, RowType>



const initialState: IModelAction = {
  collar: {
    id: 12,
    model: `/models/collars/collar-1-1.glb?timestamp=${Date.now()}`,
    price: 0,
    title: 'Default collar model', 
    
  }, 
  febric: {
    id: 12,
    model: defaultFebric,
    price: 10, 
    title: '', 
    material: 'string',
    tone: 'string',
    febricTypes: 'string',
    season:'summer'
  }, 
  cuff: {
    id: 12,
    model: `${defaultCuffModel}?timestamp=${Date.now()}`,
    price: 0,
    title: 'default cuff model', 
  }, 
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
  },
});

// const accent = {
//   collar: {
//     selected: 'By Default',
//     febric: {
//       id: null,
//       url: 'http://',
//     },
//   },
//   cuff: {
//     selected: 'By Default',
//     febric: {
//       id: null,
//       url: 'http://',
//     },
//   },
// };

export const {updateModel} = modelSlice.actions;
export default modelSlice.reducer

