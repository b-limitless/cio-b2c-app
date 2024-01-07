import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { IAccentGlobal } from 'slices/accentSlice';
import { ICartItem } from 'slices/cartSlice';
import { TFebric } from 'slices/febricSlice';
import { IModelAction } from 'slices/modelSlice';

export type TSnapShotUploadingStates = 'upload' | 'uploaded' | 'uploading' | 'error' | 'ideal';

export interface IScreenShortCartItem {
  cartData: Partial<Omit<ICartItem, 'model' | 'accent'>> & {
    model: IModelAction ; // both of them will be updated
    accent:IAccentGlobal;
    originalImageUrl?: string;
    thumbnailImageUrl?: string;
    deliveryTime?: string;
    febric: TFebric
  };
}

export interface ICaptureModelScreenShot extends IScreenShortCartItem {
  takeScreenShot: TSnapShotUploadingStates;
  setTakeScreenShot: Function;
  dispatch: Dispatch<AnyAction>;
  // setSnapShotUploadState: Function;
}
