/** 路由配置
 * 使用延迟加载方式引入：
 * const component = lazy(() => import(PATH_TO_COMPONENT));
 */
import { ComponentClass, FC, lazy } from "react";
import Demo from "../components/Demo";

const Empty = lazy(() => import("../components/Empty"));

/** 页面/路由配置 */
const routeConfigs: RouterConfigItem[] = [
  { path: 'page1', component: Empty },
  { path: 'page2', component: Demo },
  { path: 'page3', component: Empty },
  { path: 'page4', component: Empty },
];

export const HOME_PATH = '/page1';

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  component: FC | ComponentClass;
}
