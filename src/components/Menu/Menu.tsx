import { FC, useMemo } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import routeConfigs from "../../configs/routeConfigs";

const StyledMenu = styled.div`
  width: 15rem;
  height: 100%;
  background-color: #5f5f5f;
`;

const StyledMenuItem = styled.div`
  height: 4rem;
  line-height: 4rem;
  border-bottom: 2px solid #6c6c6c;
  text-align: center;
  color: white;
  font-size: 1rem;

  &:hover {
    background-color: #A70000;
  }
`;

const ACTIVITY_COLOR = '#A70000';

const Menu: FC<RouteComponentProps> = ({ location }) => {
  const activity = useMemo(() => {
    return location.pathname.slice(1);
  }, [location]);

  const menus = useMemo(() => {
    return routeConfigs.map((c) => {
      return (
        <Link to={`/${c.path}`} key={c.path}>
          <StyledMenuItem
            style={{ backgroundColor: c.path === activity ? ACTIVITY_COLOR : "" }}
          >
            {c.title}
          </StyledMenuItem>
        </Link>
      );
    });
  }, [activity]);

  return <StyledMenu>{menus}</StyledMenu>;
};

export default withRouter(Menu);
