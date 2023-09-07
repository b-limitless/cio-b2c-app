import { OrderProcessType } from "pages/customize/enums";

export interface Base {
  nextStageHandler: Function;
}

export interface OrderCommonInterface extends Base {
  setMeasurementJourney: Function;
  measurementJourney: OrderProcessType;
  
}
