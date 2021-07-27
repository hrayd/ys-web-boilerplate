/** 左侧菜单 */
import { FC, useMemo, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import routeConfigs from "../../configs/routeConfigs";
import { Menu as AntdMenu, Button } from "antd";
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

  return (
    <>
      <Sider
        collapsed={collapsed}
        collapsible
        onCollapse={setCollapsed}
        collapsedWidth={0}
        theme="light"
        trigger={null}
      >
        <AntdMenu
          mode="inline"
          selectedKeys={[activity]}
          style={{ height: "100%" }}
        >
          {menus}
          {collapsed ? null : (
            <StyledTrigger
              onClick={() => setCollapsed((prev) => !prev)}
              title={t("closeMenu")}
            >
              <DoubleLeftOutlined />
            </StyledTrigger>
          )}
        </AntdMenu>
      </Sider>
      {collapsed ? (
        <Button
          icon={<DoubleRightOutlined />}
          title={t("openMenu")}
          onClick={() => setCollapsed(false)}
          style={{ position: "absolute", top: "8em" }}
          type="primary"
        />
      ) : null}
    </>
  );
};

export default withRouter(Menu);

const StyledTrigger = styled.div`
  position: absolute;
  height: 3em;
  line-height: 3em;
  text-align: center;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;
