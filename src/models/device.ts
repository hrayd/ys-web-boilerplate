import { DeviceStatus } from "./common";

export interface Device {
  id: string;
  name: string;
  code: string;
  model: string;
  manufacturer: string;
  status: DeviceStatus;
  lastDate: number;
  validDate: number;
  unit: string;
  person: string;
  inspector: string;
  remark: string;
}
