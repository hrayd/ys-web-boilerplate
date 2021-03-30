import { DeviceStatus, Sex } from "../models/common";

/**
 * 字典列表，只记录字典取值列表
 * 名称写在 /public/locales/{lang}/dict.json 目录下
 */
export const DictSex = [Sex.Female, Sex.Male];

export const DictDeviceStatus = [
  DeviceStatus.Normal,
  DeviceStatus.Using,
  DeviceStatus.Useless,
];
