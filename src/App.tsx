import "./App.less";
import styled from "styled-components";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Home from "./components/Home";
import { Suspense } from "react";
import LoadingPage from "./pages/LoadingPage";

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <StyledApp>
        <Header />
        <StyledContent>
          <Menu />
          <Home />
        </StyledContent>
      </StyledApp>
    </Suspense>
  );
}

export default App;

const StyledApp = styled.div`
  width: 100vw;
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
