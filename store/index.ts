'use client';
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import accent from "slices/accentSlice";
import cart from 'slices/cartSlice';
import currentCustomer from "slices/customerSlice";
import febric from "slices/febricSlice";
import febrics from "slices/febricsSlice";
import measurment from "slices/measurmentSlice";
import model from "slices/modelSlice";
import modelType from "slices/modelTypeSlice";
import shipping from "slices/shippingSlice";
import store from "slices/storeSlice";
import cartIndexToupdate from "slices/updateCartIndex";

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
        store, 
        currentCustomer
        
    },
    middleware: [thunk]
});



export type RootState = ReturnType <typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;