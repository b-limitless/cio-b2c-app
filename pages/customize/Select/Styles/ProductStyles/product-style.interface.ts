import { MouseEventHandler } from 'react';
import { IAccents } from '../../Accents';
import { TCollar } from 'slices/accentSlice';

export interface ItemInterface {
    name: string;
    id: string;
    title: string;
    mediaUrl: string;
    onClickHanlder: MouseEventHandler<HTMLLabelElement>;
}
export type TOnClickEvent = 'accent' | 'style' | 'febric';

export interface IStyles {
    collarAccent: TCollar
    cuffAccent: TCollar
}

export interface ProductStylesInterface extends IAccents  {
    label: string;
    childrens: any[];
    code: string;
    type: TOnClickEvent
    setActiveAccent?: Function;
    collarAccent?: TCollar
    cuffAccent?:TCollar
}


