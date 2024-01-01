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

export interface IUpdateBase {
  index: number;
}
export interface IUpdateQuantity extends IUpdateBase {
  qty: number;
  addOrRemove: TQuantityAction;
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
      const { qty, addOrRemove,  index } = action.payload;

      const newState: ICart = JSON.parse(JSON.stringify(state));

      const updatedItem = newState[index];

      if (addOrRemove === 'add') {
        updatedItem.qty += qty;
      }

      if (addOrRemove === 'remove') {
        updatedItem.qty -= qty;
      }

      if(updatedItem.qty === 0) {
        newState.splice(index, 1);
      }

      if(updatedItem.qty > 0) {
        newState[index] = updatedItem;
      }
      return newState;
    },
    duplicateItem(state: ICart, action: PayloadAction<IUpdateBase>) {
       const {index} = action.payload;
       const deepCopyItem = JSON.parse(JSON.stringify(state[index]));
       return [...state, deepCopyItem]; 

    },
    deleteItemAction(state: ICart, action:PayloadAction<IUpdateBase>) {
      // Product id can be p
      const {index: productId} = action.payload;
      console.log('index: productId', productId)

      return [...state.filter((cart) => cart.id !== productId)];

    }
  },
});

export const { addToCart, updateQuantity, duplicateItem, deleteItemAction } = cartSlice.actions;
export default cartSlice.reducer;
