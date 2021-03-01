/**
 * App Container
 */
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import history from "./utils/history";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./components/Home";

import "./index.css";
import "./i18n";
import "./App.less";

dayjs.locale("zh-cn");

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

export default App;
