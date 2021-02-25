/** 上方标题栏 */
import { FC } from "react";
import styled from "styled-components";
import pkg from "../../../package.json";
import icon from '../../assets/icon.png';

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
  display: flex;
  flex-direction: row;
`;

const StyledHeaderIcon = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: .5rem;
  background: url(${icon}) center/cover no-repeat;
  margin-right: 1rem;
`;

const StyledHeaderTitle = styled.div`
  flex: 1;
`;

const Header: FC = () => {
  return (
    <StyledHeader>
      <StyledHeaderIcon/>
      <StyledHeaderTitle>{pkg.description}</StyledHeaderTitle>
    </StyledHeader>
  );
};

export default Header;
