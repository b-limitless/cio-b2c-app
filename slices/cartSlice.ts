import { RowType, UpdateModelAction } from './modelSlice';
import { IModelAction } from './accentSlice';
import { TMode } from './modelTypeSlice';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getRequestMeta } from 'next/dist/server/request-meta';

export type ICartItem = {
  model: IModelAction & { febric: RowType };
  accent: IModelAction;
  modelType: TMode;
  subTotal: number;
  qty: number;
  discount?: number;
  availability: String;
  id: number;
  originalImageUrl?: string;
  deliveryTime?: string | null;
};

export type TQuantityAction = 'add' | 'remove';

export interface IUpdateQuantity {
  qty: number;
  addOrRemove: TQuantityAction;
  id: number;
}

export type ICart = ICartItem[];

const initialState: ICart = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: ICart, action: PayloadAction<ICartItem>) => {
      const payload = action.payload;
      return [...state, payload];
    },
    updateQuantity(state: ICart, action: PayloadAction<IUpdateQuantity>) {
      const { qty, addOrRemove, id } = action.payload;

      const newState: ICart = JSON.parse(JSON.stringify(state));

      // Get the cart from index
      const updatedItem = newState.filter((product) => product.id === id)[0];

      if (addOrRemove === 'add') {
        updatedItem.qty += qty;
      }

      if (addOrRemove === 'remove') {
        updatedItem.qty -= qty;
      }

      
      return [updatedItem, ...state.filter(product => product.id !== id)];
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
