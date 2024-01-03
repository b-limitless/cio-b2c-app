'use client';
import { configureStore } from "@reduxjs/toolkit";
import model from "slices/modelSlice";
import accent from "slices/accentSlice";
import modelType from "slices/modelTypeSlice";
import cart from 'slices/cartSlice';
import cartIndexToupdate from "slices/updateCartIndex";

export const Store = configureStore({
    reducer: {
        model, 
        accent, 
        modelType, 
        cart, 
        cartIndexToupdate
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;