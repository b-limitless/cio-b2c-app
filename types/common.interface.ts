import { IShippingState } from "slices/shippingSlice";
import { OrderProcessType } from "types/enums";

export interface Base {
  nextStageHandler: Function;
}

export interface OrderCommonInterface extends Base {
  setMeasurementJourney: Function;
  measurementJourney: OrderProcessType;
  
}

export interface IMeasurementForm extends OrderCommonInterface {
  onChangeHandler?:Function;
  onMouseLeaveEventHandler: Function;
  
}

export interface IShippingFrom extends IMeasurementForm {
  shipping: IShippingState
}
