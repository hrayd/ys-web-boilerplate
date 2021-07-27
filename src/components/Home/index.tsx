/** Home内容主页 */
import { FC, Suspense, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import routeConfigs, { HOME_PATH } from "../../configs/routeConfigs";
import Page404 from "../../pages/404";
import ErrorPage from "../../pages/ErrorPage";
import LoadingPage from "../../pages/LoadingPage";
import withErrorBoundary from "../ErrorBoundray";
import Footer from "../Footer";
import Header from "../Header";
import Menu from "../Menu";

const Home: FC = () => {
  const routes = useMemo(
    () =>
      routeConfigs.map((c) => {
        return (
          <Route
            key={c.path}
            path={`/${c.path}`}
            component={withErrorBoundary(c.component)}
          />
        );
      }),
    []
  );

  return (
    <Suspense fallback={<LoadingPage />}>
      <StyledApp>
        <Header />
        <StyledContent>
          <Menu />
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
        </StyledContent>
      </StyledApp>
    </Suspense>
  );
};

export default Home;

const StyledApp = styled.div`
  width: 100vw;
  min-width: 1200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
`;

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
