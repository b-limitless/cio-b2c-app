'use client';
import { configureStore } from "@reduxjs/toolkit";
import model from "slices/modelSlice";
import accent from "slices/accentSlice";
import modelType from "slices/modelTypeSlice";
import cart from 'slices/cartSlice';
import cartIndexToupdate from "slices/updateCartIndex";
import febric from "slices/febricSlice";
import measurment from "slices/measurmentSlice";
import shipping from "slices/shippingSlice";
import febrics from "slices/febricsSlice";
import store from "slices/storeSlice";

export const Store = configureStore({
    reducer: {
        model, 
        accent, 
        modelType, 
        cart, 
        cartIndexToupdate, 
        febric, 
        measurment, 
        shipping, 
        febrics, 
        store
        
    }
});

export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;