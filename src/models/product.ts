export interface Product {
  id: string;
  field: string;
  scenes: string;
  modelName: string;
  details: Record<string, string>;
}

export interface ProductModel {
  uid: string;
  attributes: ModelAttribute[];
  events: ModelEvent[];
  services: ModelService[];
  rules: ModelRule[];
}

export enum ModelAttributeDataType {
  int = 0,
  float = 1,
  bool = 2,
  string = 3,
}

export enum ModelAttributeRoundMode {
  round = 0,
  floor = 1,
  up = 2,
  intercept = 3,
}

export enum ModelAttributeRWPermission {
  readOnly = 0,
  readWrite = 1,
  writeOnly = 2,
}

export enum ModelEventType {
  info = 0,
  warn = 1,
  error = 2,
}

export enum ModelRuleType {
  eigenValue = 0,
  region = 1,
  changeRate = 2,
}

interface ModelParamItem {
  paramKey: string;
  paramName: string;
  dataType: ModelAttributeDataType;
}

export interface ModelAttribute {
  attrKey: string;
  attrName: string;
  dataType: ModelAttributeDataType;
  initValue: string;
  abnormal: string;
  maxValue?: number;
  minValue?: number;
  precision: number;
  roundMode?: ModelAttributeRoundMode;
  unit: string;
  rwPermission: ModelAttributeRWPermission;
}

export interface ModelEvent {
  eventKey: string;
  eventName: string;
  eventType: ModelEventType;
  description: string;
  outputParam: ModelParamItem[];
}

export interface ModelService {
  serviceKey: string;
  serviceName: string;
  inputParam: ModelParamItem[];
  outputParam: ModelParamItem[];
  description: string;
}

export interface ModelRule {
  ruleKey: string;
  ruleName: string;
  ruleType: ModelRuleType;
  inputParam: string;
  outputParam: string;
  description: string;
}
