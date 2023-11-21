import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const modelProperties = {
  collar: {
    id: 12,
    model: 'URL for the model to load from CDN',
  },
  scuff: {
    id: 13,
    model: 'URL for the model to load',
  },
  sleeves: {
    id: 13,
    model: 'URL for the model to load',
  },
  checkpocket: {
    id: 13,
    model: 'URL for the model to load',
  },
};

type ModelType = typeof modelProperties;
type modelKeys = keyof ModelType;

interface UpdateModelAction {
  key: modelKeys;
  payload: ModelType[modelKeys];
}

interface initialState {
  model: ModelType | null;
}

const initialState: initialState = {
  model: null,
  //   accent: null,
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    updateModel: (state: initialState, action: PayloadAction<UpdateModelAction>) => {
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

