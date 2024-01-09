import { IMeasurementBase } from "./IMeasurementBase";

export interface IPantMeasurement extends IMeasurementBase{
    legLength:number;
    paintsWaist: number;
    raise: number;
    hips:number;
    thigs:number;
}