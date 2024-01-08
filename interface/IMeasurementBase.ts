export type IMeasurementUnite = 'inch' | 'cm';

export type IMeasurementHeight = {
  unite: IMeasurementUnite;
  value: number;
  weight: number;
  age: number;
};

export interface IMeasurementBase {
  fullName: string;
  height: IMeasurementHeight;
}
