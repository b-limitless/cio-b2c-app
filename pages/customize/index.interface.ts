import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { IModelAction } from "slices/accentSlice";
import { ICartItem } from "slices/cartSlice";
import { UpdateModelAction } from "slices/modelSlice";

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
    dispatch: Dispatch<AnyAction>
}