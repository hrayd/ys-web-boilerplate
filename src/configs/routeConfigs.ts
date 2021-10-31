/**
 * 路由-菜单配置文件
 * @author donghui
 */
import { ComponentClass, FC, lazy } from "react";
import DemoUseDeBounce from "../hooks/examples/DebounceAndThrottle";
// 使用延迟加载的方式引入组件
const Demo = lazy(() => import("../components/DemoPage"));
const BasicForm = lazy(() => import("../components/DemoForm/BasicForm"));
const StepForm = lazy(() => import("../components/DemoForm/StepForm"));

// 主页路径
export const HOME_PATH = "/page1";

/**
 * 页面/路由配置
 * 多级菜单可根据业务需求调整数据结构，但考虑到后续权限控制的实现，推荐将所有菜单项平铺，通过字段逻辑来进行分组或嵌套
 */
const routeConfigs: RouterConfigItem[] = [
  { path: "page1", component: Demo },
  { path: "page2", component: BasicForm },
  { path: "page3", component: StepForm },
  { path: "page4", component: DemoUseDeBounce },
];

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  component: FC | ComponentClass;
}
