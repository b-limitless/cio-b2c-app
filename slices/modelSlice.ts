// 'use client';

import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const modelProperties = {
  collar: {
    id: 12,
    model: 'URL for the model to load from CDN',
    price: 0
  },
  febric: {
    id: 12, 
    model: '/img/febric1.jpg', 
    price: 0

  }
  // scuff: {
  //   id: 13,
  //   model: 'URL for the model to load',
  // },
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
type ModelKeys = keyof ModelType;

export  interface UpdateModelAction {
  key: modelKeys;
  payload: RowType;
}

export type RowType = {
  id: number;
  model: string;
  price: number;
  
}

type ModelActionInterface = Record<ModelKeys, RowType>



const initialState: ModelActionInterface = {
  collar: {
    id: 12,
    model: `/models/collars/collar-3.glb?timestamp=${Date.now()}`,
    price: 0
  }, 
  febric: {
    id: 12,
    model: `/img/febric-6.jpg?timestamp=${Date.now()}`,
    price: 0
  }
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    updateModel: (state: ModelActionInterface, action: PayloadAction<UpdateModelAction>) => {
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

