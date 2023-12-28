import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { ICartItem } from "slices/cartSlice";


export type TSnapShotUploadingStates = 'upload' | 'uploaded' | 'uploading' | 'error' | 'ideal';

export interface IScreenShortCartItem {
    cartData: Partial<Omit<ICartItem, 'model'>> & {
        model: any;
        originalImageUrl?:string,
        thumbnailImageUrl?:string;
    };
}

export interface ICaptureModelScreenShot extends IScreenShortCartItem {
    takeScreenShot:TSnapShotUploadingStates;
    setTakeScreenShot:Function;
    dispatch: Dispatch<AnyAction>;
    // setSnapShotUploadState: Function;
    
}
