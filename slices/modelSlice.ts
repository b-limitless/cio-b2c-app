// 'use client';

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
type modelKeys = keyof ModelType;
export type ModelKeys = keyof ModelType;

export  interface UpdateModelAction {
  key: modelKeys;
  payload: RowType;
}

export type TRestFebric = {
  userId: string;
  title: string;
  price: number;
  deliveryTime: string;
  material: string;
  tone: string;
  febricTypes: string;
}

export type RowType = {
  id: number;
  model: string;
  price: number;
  title: string;
  originalImageUrl?:string;
} & TRestFebric;

type IModelAction = Record<ModelKeys, RowType>



const initialState: IModelAction = {
  collar: {
    id: 12,
    model: `/models/collars/collar-1-1.glb?timestamp=${Date.now()}`,
    price: 0,
    title: '', 
    userId: 'string',
    deliveryTime: 'string',
    material: 'string',
    tone: 'string',
    febricTypes: 'string',
  }, 
  febric: {
    id: 12,
    model: `/img/febric-6.jpg?timestamp=${Date.now()}`,
    price: 10, 
    title: '', 
    userId: 'string',
    deliveryTime: 'string',
    material: 'string',
    tone: 'string',
    febricTypes: 'string',
  }, 
  cuff: {
    id: 12,
    model: `${defaultCuffModel}?timestamp=${Date.now()}`,
    price: 0,
    title: '', 
    userId: 'string',
    deliveryTime: 'string',
    material: 'string',
    tone: 'string',
    febricTypes: 'string',
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

