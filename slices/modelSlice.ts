/**
 * Despite we need to customize the cuff buttons whole and cuff button this can be 
 * important feature to implement all of them but leaving them for button color 
 * Working on button colors because it would be more important right now to provide
 * to customize the cuff button and whole color then whole shirt button colors
 * 
 * Come back when we implement different type of cuff model and collar model 
 * things will be more clarer in this case 
 * **/
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
  }, 
  buttons: {
    id: 13,
    modelURL: defaultCuffModel,
    price: 0,
    title: ''
  }, 
  buttonWholes: {
    id: 13,
    modelURL: defaultCuffModel,
    price: 0,
    title: '',
  }, 
  cuffButtons: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
  }, 
  cuffButtonsWholes: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
  }

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
  buttonsMeshNames?:string[], 
  buttonWholeMeshNames?:string[]
};

export type IModelAction = Record<ModelKeys, RowType>;

const initialState: IModelAction = {
  collar: {
    id: 12,
    modelURL: `/models/collars/collar-button-down.glb?timestamp=${Date.now()}`,
    price: 0,
    title: 'Default collar model',
    label: 'default',
    code: 'default',
    buttonsMeshNames:['MatShape_21501_Node', 'MatShape_21509_Node'], 
    buttonWholeMeshNames:['Collar_2_Node', 'Collar_1_Node']
  },
  cuff: {
    id: 12,
    modelURL: `${defaultCuffModel}?timestamp=${Date.now()}`,
    price: 0,
    title: 'default cuff model',
    label: 'default',
    code: 'default',
    buttonsMeshNames:['MatShape_382057_Node', 'MatShape_238060_Node'], 
    buttonWholeMeshNames:['MatShape_383887_Node', 'MatShape_383876_Node']
  },
  chestpocket: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
  },
  buttons: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
  },
  buttonWholes: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
  }, 
  cuffButtons: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
  }, 
  cuffButtonsWholes: {
    id: null,
    modelURL: '',
    price: 0,
    title:''
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
      return { ...state, ...rest };
    },
  },
});

export const { updateModel, updateAllProps } = modelSlice.actions;
export default modelSlice.reducer;
