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

interface IFebricGroup {
  febircs: FebricAttrs[];
  affectedRows: number | null;
  limit: number | null;
}

interface IFebrics {
  loading: boolean;
  data: IFebricGroup;
  error: string | null;
}

const initialState: IFebrics = {
  loading: true,
  data: {
    febircs: [],
    affectedRows: null,
    limit: null,
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
  },
});

export const { fetchingFebricAction, fetchedFebricsAction, fetchedErrorAction } = febricsSlice.actions;
export default febricsSlice.reducer; 