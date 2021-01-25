import { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  height: 6rem;
  background-color: grey;
`;

const Header: FC = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
