import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { febricSeasons } from 'config/febric';


export interface FebricAttrs {
  // userId: mongoose.Schema.Types.ObjectId;
  title: string;
  price: number;
  deliveryTime: string;
  excellence: string;
  warmth: string;
  weight: string;
  season: string;
  threadStyle: string;
  brightness: string;
  superShiny: boolean;
  material: string;
  tone: string;
  threadCount: string;
  opacity: string;
  waterproof: boolean;
  stretchyText: string;
  stretchy: boolean;
  mis: string;
  type: string;
  febricTypes: string;
  febricSeasons: string;
  threadTypes: string;
  threadCounts: string;
  characters: string[];
  thumbnailImageUrl: string;
  originalImageUrl: string;
  compositions: any[];
}

enum EFebricFilter {
  season='season',
   material='material', 
   weave='weave'
}

interface IFebricGroup {
  febrics: FebricAttrs[];
  affectedRows: number | null;
  limit: number | null;
  filters: {[key in EFebricFilter]: any[]}
}


export interface IFebrics {
  loading: boolean;
  data: IFebricGroup;
  error: string | null;
}

const initialState: IFebrics = {
  loading: true,
  data: {
    febrics: [],
    affectedRows: null,
    limit: null,
    filters: {season: [], material: [], weave: []}
  },
  error: null,
};

const febricsSlice = createSlice({
  name: 'febrics',
  initialState,
  reducers: {
    fetchingFebricAction: (state: IFebrics, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    fetchedFebricsAction: (state: IFebrics, action: PayloadAction<IFebricGroup>) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    fetchedErrorAction: (state: IFebrics, action: PayloadAction<string | null>) => {
      return {
        ...state,
        error: action.payload,
      };
    },
    updateFilter:(state:IFebrics, action:PayloadAction<{key:EFebricFilter, value:string}>) => {
      const {key, value} = action.payload;

      return {
        ...state,
        data: {
          ...state.data,
          filters: {
            ...state.data.filters, 
            [key]: state.data.filters[key].includes(value) ? 
                   state.data.filters[key].filter((val) => val !== value) : 
                   [...state.data.filters[key], value]
          }
        }
      }
    }
  },
});

export const { fetchingFebricAction, fetchedFebricsAction, fetchedErrorAction } = febricsSlice.actions;
export default febricsSlice.reducer; 