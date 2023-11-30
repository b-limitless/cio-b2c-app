'use client';
import { configureStore } from "@reduxjs/toolkit";
import model from "slices/modelSlice";
import accent from "slices/accentSlice";

export const Store = configureStore({
    reducer: {
        model, 
        accent
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;