import { FC } from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border-top: 1px solid grey;
  background-color: #320001;
  color: white;
`;

const Footer: FC = () => {
  return <StyledFooter>Footer</StyledFooter>;
};

export default Footer;
