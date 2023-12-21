import { UpdateModelAction } from './modelSlice';
import { IModelAction } from './accentSlice';
import { TMode } from './modelTypeSlice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ICartItem = {
  model: UpdateModelAction;
  accent: IModelAction;
  modelType: TMode;
};

export type ICart = ICartItem[];

const initialState: ICart = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: ICart, action: PayloadAction<ICartItem>) => {
      const payload = action.payload;
      return [...state, payload] ;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
