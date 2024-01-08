import { IMeasurementBase } from "./IMeasurementBase";

export interface IShirtMeasurement extends IMeasurementBase {
  sleevLength: number;
  shoulderWidth: number;
  chestAround: number;
  stomach: number;
  bicepAround: number;
  torsoLength: number;
  hips: number;
  wrist: number;
  // Add more properties as needed
}

