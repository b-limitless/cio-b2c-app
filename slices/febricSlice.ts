import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { defaultFebric } from 'config/default';
import { febricSample } from 'sample/febric';

// export type TFebric = {
//   title: string;
//   price: number;
//   material?: string;
//   tone?: string;
//   febricTypes?: string;
//   id: number;
//   model: string;
//   originalImageUrl?: string;
//   code?: string;
//   label?: string;
//   season?: string;
// };

export type TBaseFebric = typeof febricSample;
export type TFebric = Partial<TBaseFebric>

const initialState: TFebric = {
  id: '65b25738d8db760157740560',
  model: defaultFebric,
  price: 10,
  title: '',
  material: 'Cotton',
  tone: 'light',
  febricTypes: 'Cotton',
  season: 'summer',
  label: 'default',
  code: 'default',
  originalImageUrl: defaultFebric,
};

const febricSlice = createSlice({
  name: 'febric',
  initialState,
  reducers: {
    updateFebric: (state: TFebric, action: PayloadAction<TFebric>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFebric } = febricSlice.actions;
export default febricSlice.reducer;
