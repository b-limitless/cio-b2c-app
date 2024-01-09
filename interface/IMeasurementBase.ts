export type IMeasurementUnite = 'inch' | 'cm';

export type IMeasurementHeight = {
  unite: IMeasurementUnite;
  value: number;
};

export interface IMeasurementBase {
  fullName: string;
  height: IMeasurementHeight;
  weight: number;
  age:number;
}

