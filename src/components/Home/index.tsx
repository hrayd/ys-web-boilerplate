/** Home内容主页 */
import { FC, Suspense, useMemo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routeConfigs, { HOME_PATH } from "../../configs/routeConfigs";
import Page404 from "../../pages/404";
import ErrorPage from "../../pages/ErrorPage";
import LoadingPage from "../../pages/LoadingPage";
import withErrorBoundary from "../base/ErrorBoundray";
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
      <div className="w-screen min-w-min h-screen overflow-hidden flex flex-col">
        <Header />
        <div className="w-full flex-1 flex flex-row overflow-hidden">
          <Menu />
          <div className="flex-1 flex flex-col p-4 overflow-auto">
            <div className="flex-1">
              <Suspense fallback={<LoadingPage />}>
                <Switch>
                  <Redirect from="/" to={HOME_PATH} exact />
                  {routes}
                  <Route path="/error" component={ErrorPage} />
                  <Route path="/" component={Page404} />
                </Switch>
              </Suspense>
            </div>

            <Footer copyright="版权信息" />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
