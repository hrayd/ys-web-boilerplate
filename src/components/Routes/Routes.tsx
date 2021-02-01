/** 路由模块 */
import { FC, Suspense, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import routeConfigs, { HOME_PATH } from "../../configs/routeConfigs";
import Page404 from "../../pages/404";

const StyledRoutes = styled.div`
  flex: 1;
  height: 100%;
  padding: 1rem;
  background-color: #dedede;
  overflow: hidden;
`;

const Routes: FC = () => {
  const routes = useMemo(
    () =>
      routeConfigs.map((c) => {
        return (
          <Route key={c.path} path={`/${c.path}`} component={c.component} />
        );
      }),
    []
  );

  return (
    <StyledRoutes>
      <Suspense fallback={<Page404 />}>
        <Switch>
          <Redirect from="/" to={HOME_PATH} exact />
          {routes}
          <Route path="/" component={Page404} />
        </Switch>
      </Suspense>
    </StyledRoutes>
  );
};

export default Routes;
