/** 路由配置
 * 使用延迟加载方式引入：
 * const component = lazy(() => import(PATH_TO_COMPONENT));
 */
import { ComponentClass, FC, ForwardRefExoticComponent, lazy } from "react";
import {
  ControlOutlined,
  FileProtectOutlined,
  ScheduleOutlined,
  BookOutlined,
  ClusterOutlined,
  IdcardOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";

const Empty = lazy(() => import("../components/Empty"));

/** 页面/路由配置 */
const routeConfigs: RouterConfigItem[] = [
  { path: "devices", component: Empty, icon: ControlOutlined },
  { path: "standards", component: Empty, icon: FileProtectOutlined },
  { path: "tasks", component: Empty, icon: ScheduleOutlined },
  { path: "certificates", component: Empty, icon: BookOutlined },
  { path: "categories", component: Empty, icon: ClusterOutlined },
  { path: "users", component: Empty, icon: IdcardOutlined },
  { path: "datum", component: Empty, icon: DatabaseOutlined },
];

export const HOME_PATH = "/page1";

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  component: FC | ComponentClass;
  group?: string;
  icon: ForwardRefExoticComponent<any>;
}
