/** 路由配置
 * 使用延迟加载方式引入：
 * const component = lazy(() => import(PATH_TO_COMPONENT));
 */
import { ComponentClass, FC, lazy } from "react";

// const Empty = lazy(() => import("../components/Empty"));
const Demo = lazy(() => import("../components/Demo"));
const BasicForm = lazy(() => import("../components/DemoForm/BasicForm"));
const StepForm = lazy(() => import("../components/DemoForm/StepForm"));
const ComplexForm = lazy(() => import("../components/DemoForm/ComplexForm"));

/** 页面/路由配置 */
const routeConfigs: RouterConfigItem[] = [
  { path: "page1", component: Demo },
  { path: "page2", component: BasicForm },
  { path: "page3", component: StepForm },
  { path: "page4", component: ComplexForm },
];

export const HOME_PATH = "/page1";

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  component: FC | ComponentClass;
}
