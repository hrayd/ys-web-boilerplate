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
const User = lazy(() => import("../components/UserManagement"));
const Category = lazy(() => import("../components/Category"));
const Device = lazy(() => import("../components/DeviceManagement"));
const Instrument = lazy(() => import("../components/InstrumentManagement"));

/** 页面/路由配置 */
const routeConfigs: RouterConfigItem[] = [
  { path: "devices", component: Device, icon: ControlOutlined },
  { path: "standards", component: Instrument, icon: FileProtectOutlined },
  { path: "tasks", component: Empty, icon: ScheduleOutlined },
  { path: "certificates", component: Empty, icon: BookOutlined },
  { path: "categories", component: Category, icon: ClusterOutlined },
  { path: "users", component: User, icon: IdcardOutlined },
  { path: "datum", component: Empty, icon: DatabaseOutlined },
];

export const HOME_PATH = "/devices";

export default routeConfigs;

interface RouterConfigItem {
  path: string;
  component: FC | ComponentClass;
  group?: string;
  icon: ForwardRefExoticComponent<any>;
}
