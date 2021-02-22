/** 上方标题栏 */
import { FC } from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  font-weight: 600;
  font-size: 1.2rem;
  border-bottom: 1px solid grey;
  background-color: #320001;
  color: white;
`;

const Header: FC = () => {
  return <StyledHeader>Header</StyledHeader>;
};

export default Header;
