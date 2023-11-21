'use client';
import { configureStore } from "@reduxjs/toolkit";
import model from "slices/modelSlice";

export const Store = configureStore({
    reducer: {
        model
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;