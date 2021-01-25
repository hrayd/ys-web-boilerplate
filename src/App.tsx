import './App.less';
import styled from 'styled-components';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Menu from './components/Menu/Menu';

function App() {
  return (
    <StyledApp>
      <Header />
      <StyledContent>
        <Menu />
      </StyledContent>
      <Footer />
    </StyledApp>
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
