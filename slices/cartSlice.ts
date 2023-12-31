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
      // Get the cart from index

      const updateCart = state.map((product) => {
        if (product.id === id) {
          if (addOrRemove === 'add') {
            product.qty += qty;
          }

          if (addOrRemove === 'remove') {
            product.qty -= qty;
          }
        }

        return product;
      });

      return updateCart;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
