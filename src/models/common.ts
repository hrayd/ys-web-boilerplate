export type AsyncCallback<T = any> = (data: { isOk: boolean; data: T }) => void;

export type Dict = { id: number | string; name: string };

export enum NumberBoolean {
  False = 0,
  True = 1,
}

export enum Rule {
  Measurer = 0,
  Manager = 1,
}

export enum Sex {
  Female = 0,
  Male = 1,
}

export enum DeviceStatus {
  Useless = 0,
  Normal = 1,
  Using = 2,
}

export enum InstrumentStatus {
  Useless = 0,
  Normal = 1,
  Using = 2,
}
