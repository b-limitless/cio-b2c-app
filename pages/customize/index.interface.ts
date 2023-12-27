import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { ICartItem } from "slices/cartSlice";
import { TSnapShotUploadingStates } from "./[slug]";

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
    setSnapShotUploadState: Function;
    
}
