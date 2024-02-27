import { MouseEventHandler } from 'react';

import { TBase } from 'slices/accentSlice';

export interface IAccents {
  setShowAccentFebricModel: Function;
  showAccentFebricModel: boolean;
  setActiveAccent?: Function;
}

export interface ItemInterface {
  name: string;
  id: string;
  title: string;
  mediaUrl: string;
  onClickHanlder: MouseEventHandler<HTMLLabelElement>;
  iconClass: string;
}
export type TOnClickEvent = 'accent' | 'style' | 'febric';

export interface IStyles {
  collarAccent: TBase;
  cuffAccent: TBase;
}

export interface ProductStylesInterface extends IAccents {
  label: string;
  childrens: any[];
  code: string;
  type: TOnClickEvent;
  setActiveAccent?: Function;
  collarAccent?: TBase;
  cuffAccent?: TBase;
}
