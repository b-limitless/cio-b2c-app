import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { buttonThreadBaseURI } from "config/default";

export interface ThreadColor {
    id: string; 
    title: string; 
    febric: string; 
    price: number;
}

export interface ButtonColor extends ThreadColor {
    texture: string;
}




const initialState: ButtonColor[] = [
    {
        id: '1',
        title: 'Black',
        texture: `/img/buttons/texture/blue.png`,
        price: 0,
        febric: `/img/buttons/icon/blue.png`
    }, 
    {
        id: '2',
        title: 'Black',
        texture: `/img/buttons/texture/black.png`,
        price: 0,
        febric: `/img/buttons/icon/black.png`
    }, 
    {
        id: '3',
        title: 'Black',
        texture: `/img/buttons/texture/red.png`,
        price: 0,
        febric: `/img/buttons/icon/red.png`
    }
];


const buttonColorsSlice = createSlice({
    name:'buttonColors', 
    initialState, 
    reducers: {
        addbuttonColors: (state: ButtonColor[], action:PayloadAction<ButtonColor[]>) => {
            return [...state, ...action.payload];
        }   
    }
});

export const {addbuttonColors} = buttonColorsSlice.actions;
export default buttonColorsSlice.reducer;
