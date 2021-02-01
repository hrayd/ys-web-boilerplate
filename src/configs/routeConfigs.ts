/** 路由配置
 * 使用延迟加载方式引入：
 * const component = lazy(() => import(PATH_TO_COMPONENT));
 */
import { ComponentClass, FC, lazy } from "react";

const Empty = lazy(() => import("../components/Empty/Empty"));

/** 页面/路由配置 */
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
