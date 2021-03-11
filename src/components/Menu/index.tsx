/** 左侧菜单 */
import { FC, useMemo } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import routeConfigs from "../../configs/routeConfigs";
import { Menu as AntdMenu } from "antd";
import { useTranslation } from "react-i18next";

const StyledMenu = styled.div`
  width: 15rem;
  height: 100%;
  border-right: 1px solid #f0f0f0;
  margin: 2rem 0;
`;

const Menu: FC<RouteComponentProps> = ({ location }) => {
  const { t } = useTranslation("menu");

  const activity = useMemo(() => {
    return (
      routeConfigs.find((r) => location.pathname.indexOf(r.path) === 1)?.path ||
      ""
    );
  }, [location]);

  const menus = useMemo(() => {
    return routeConfigs.map((c) => {
      return (
        <AntdMenu.Item key={c.path} icon={<c.icon style={{ fontSize: "1rem" }} />}>
          <Link to={`/${c.path}`}>{t(c.path)}</Link>
        </AntdMenu.Item>
      );
    });
  }, [t]);

  return (
    <StyledMenu>
      <AntdMenu mode="inline" selectedKeys={[activity]} style={{ fontSize: "1rem" }}>
        {menus}
      </AntdMenu>
    </StyledMenu>
  );
};

export default withRouter(Menu);
