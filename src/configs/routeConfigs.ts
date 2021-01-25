import { ComponentClass, FC } from "react";
import Empty from "../components/Empty";

const routeConfigs: RouterConfigItem[] = [
  { path: 'products', title: '产品管理', component: Empty },
  { path: 'devices', title: '设备管理', component: Empty },
  { path: 'instances', title: '边缘计算实例管理', component: Empty },
  { path: 'system', title: '系统管理', component: Empty },
];

export const HOME_PATH = 'products';

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  title: string;
  component: FC | ComponentClass;
}
