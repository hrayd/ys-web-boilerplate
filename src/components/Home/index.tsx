/** Home内容主页 */
import { FC, Suspense, useMemo } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import styled from "styled-components";
import routeConfigs, { HOME_PATH } from "../../configs/routeConfigs";
import Page404 from "../../pages/404";
import ErrorPage from "../../pages/ErrorPage";
import Footer from "../Footer";

const StyledHome = styled.div`
  flex: 1;
  height: 100%;
  background-color: #eff2f5;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const StyledRoutes = styled.div`
  padding: 0 1rem;
  flex: 1;
`;

const StyledTitle = styled.div`
  height: 4rem;
  line-height: 4rem;
  background-color: #ffffff;
  padding: 0 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Home: FC<RouteComponentProps> = ({ location }) => {
  const routes = useMemo(
    () =>
      routeConfigs.map((c) => {
        return (
          <Route key={c.path} path={`/${c.path}`} component={c.component} />
        );
      }),
    []
  );

  const title: string = useMemo(
    () => routeConfigs.find((r) => location.pathname.includes(r.path))?.title || '未知页面',
    [location]
  );

  return (
    <StyledHome>
      <StyledTitle>{title}</StyledTitle>
      <StyledRoutes>
        <Suspense fallback={<Page404 />}>
          <Switch>
            <Redirect from="/" to={HOME_PATH} exact />
            {routes}
            <Route path="/error" component={ErrorPage} />
            <Route path="/" component={Page404} />
          </Switch>
        </Suspense>
      </StyledRoutes>
      <Footer copyright="版权信息" />
    </StyledHome>
  );
};

export default withRouter(Home);
