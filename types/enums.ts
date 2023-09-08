export enum SelectionProcess {
  febrics = "febrics",
  styles = "styles",
  accents = "accents",
}

export type SelectionTypes = `${SelectionProcess}`;

export enum OrderProcess {
  measurement = "measurement",
  shipping = "shipping",
  payment_options = "payment_options",
  order_completed = "order_completed",
}

export type OrderProcessType = `${OrderProcess}`;


export type combinedTypes = OrderProcessType | SelectionTypes;