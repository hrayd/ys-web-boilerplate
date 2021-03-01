/** Home内容主页 */
import { FC, Suspense, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import routeConfigs, { HOME_PATH } from "../../configs/routeConfigs";
import Page404 from "../../pages/404";
import ErrorPage from "../../pages/ErrorPage";
import LoadingPage from "../../pages/LoadingPage";
import Footer from "../Footer";

const StyledHome = styled.div`
  flex: 1;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
`;

const StyledRoutes = styled.div`
  padding: 1rem;
  flex: 1;
`;

const Home: FC = () => {
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
    <StyledHome>
      <StyledRoutes>
        <Suspense fallback={<LoadingPage />}>
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

export default Home;
