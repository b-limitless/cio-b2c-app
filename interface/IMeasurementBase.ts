export type IMeasurementUnite = 'inch' | 'cm';

export type IMeasurementHeight = {
  unite: IMeasurementUnite;
  feet: number | null;
  inch: number | null;
};

export interface IMeasurementBase {
  fullName: string | null;
  height: IMeasurementHeight | null;
  weight: number | null;
  age:number | null;
}

