/**
 * 字典数据Model
 * 使用enum定义字典数据
 * 需作为列表项数据源时应额外输出字典项列表
 * 字典名称写在 /public/locales/{lang}/dict.json 目录下以便做i18n配置
 */

// 性别
export enum Sex {
  Female = 0,
  Male = 1,
}
export const SexList = [Sex.Female, Sex.Male];

// 领域/场景
interface Field {
  name: string;
  scenes: string[];
}
// 基础数据
export interface BaseData {
  fields: Field[]; // 领域/场景
  plType: string[]; // 编程语言
  arch: string[]; // 指令集架构
}
