/** 左侧菜单 */
import { FC, useMemo, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import routeConfigs from "../../configs/routeConfigs";
import { Menu as AntdMenu } from "antd";
import { useTranslation } from "react-i18next";
import Sider from "antd/lib/layout/Sider";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const Menu: FC<RouteComponentProps> = ({ location }) => {
  const { t } = useTranslation("menu");
  const [collapsed, setCollapsed] = useState(false);

  const activity = useMemo(() => {
    return (
      routeConfigs.find((r) => location.pathname.indexOf(r.path) === 1)?.path ||
      ""
    );
  }, [location]);

  const menus = useMemo(() => {
    return routeConfigs.map((c) => {
      return (
        <AntdMenu.Item style={{ fontSize: "1rem" }} key={c.path}>
          <Link to={`/${c.path}`}>{t(c.path)}</Link>
        </AntdMenu.Item>
      );
    });
  }, [t]);

  const trigger = useMemo(
    () =>
      collapsed ? (
        <DoubleRightOutlined
          style={{ color: "#2196F3" }}
          title={t("openMenu")}
        />
      ) : (
        <DoubleLeftOutlined
          style={{ color: "#2196F3" }}
          title={t("closeMenu")}
        />
      ),
    [collapsed, t]
  );

  return (
    <Sider
      collapsed={collapsed}
      collapsible
      onCollapse={setCollapsed}
      collapsedWidth={0}
      theme="light"
      trigger={trigger}
      breakpoint="lg"
    >
      <AntdMenu
        mode="inline"
        selectedKeys={[activity]}
        style={{ height: "100%" }}
      >
        {menus}
      </AntdMenu>
    </Sider>
  );
};

export default withRouter(Menu);
