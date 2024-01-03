import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number | null = null;

const updateCartIndexSlice = createSlice({
  name: 'updateCartIndex',
  initialState,
  reducers: {
    updateCartIndexAction: (state:number | null, action: PayloadAction<number | null>) => {
      state = action.payload;
    },
  },
});

export const { updateCartIndexAction } = updateCartIndexSlice.actions;
export default updateCartIndexSlice.reducer;