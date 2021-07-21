/** Home内容主页 */
import { FC, Suspense, useState } from "react";
import styled from "styled-components";
import LoadingPage from "../../pages/LoadingPage";
import Header from "../Header";
import Menu from "../Menu";
import Editor from "../Editor";
import { Plugin } from "../../models/plugin";

const Home: FC = () => {
  const [dragged, setDragged] = useState<Plugin>();
  return (
    <Suspense fallback={<LoadingPage />}>
      <StyledApp>
        <Header />
        <StyledContent>
          <Menu setDragged={setDragged} />
          <StyledHome>
            <Editor dragged={dragged} setDragged={setDragged} />
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
