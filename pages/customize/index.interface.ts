import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { ICartItem } from "slices/cartSlice";

export interface IScreenShortCartItem {
    cartData: Partial<Omit<ICartItem, 'model'>> & {
        model: any;
        originalImageUrl?:string,
        thumbnailImageUrl?:string;
    };
}

export interface ICaptureModelScreenShot extends IScreenShortCartItem {
    takeScreenShot:boolean;
    setTakeScreenShot:Function;
    dispatch: Dispatch<AnyAction>;
    takingScreenShot: boolean;
    setTakingScreenShot:Function;
}
