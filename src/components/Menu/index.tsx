/** 左侧菜单 */
import { FC, useMemo } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import routeConfigs from "../../configs/routeConfigs";
import { Menu as AntdMenu } from "antd";

const StyledMenu = styled.div`
  width: 15rem;
  height: 100%;
  border-right: 1px solid #f0f0f0;
  margin: 2rem 0;
`;

const Menu: FC<RouteComponentProps> = ({ location }) => {
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
          <Link to={`/${c.path}`}>{c.title}</Link>
        </AntdMenu.Item>
      );
    });
  }, []);

  return (
    <StyledMenu>
      <AntdMenu mode="inline" selectedKeys={[activity]}>
        {menus}
      </AntdMenu>
    </StyledMenu>
  );
};

export default withRouter(Menu);
