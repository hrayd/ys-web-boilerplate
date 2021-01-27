import { ComponentClass, FC } from "react";
import Empty from "../components/Empty/Empty";

const routeConfigs: RouterConfigItem[] = [
  { path: 'page1', title: '页面1', component: Empty },
  { path: 'page2', title: '页面2', component: Empty },
  { path: 'page3', title: '页面3', component: Empty },
  { path: 'page4', title: '页面4', component: Empty },
];

export const HOME_PATH = 'page1';

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  title: string;
  component: FC | ComponentClass;
}
