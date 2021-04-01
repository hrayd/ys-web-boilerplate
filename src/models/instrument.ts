import { InstrumentStatus } from "./common";

export interface Instrument {
  id: string;
  standard: string;
  name: string;
  model: string;
  code: string;
  manufacturer: string;
  status: InstrumentStatus;
  unit: string;
  person: string;
  lastTraceUnit: string;
  lastTraceDate: number;
  lastTraceCode: string;
  validDate: number;
  remark: string;
}
