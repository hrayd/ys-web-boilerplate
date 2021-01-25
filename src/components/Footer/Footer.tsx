import { FC } from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  background-color: grey;
  text-align: center;
`;

const Footer: FC = () => {
  return <StyledFooter>Footer</StyledFooter>;
};

export default Footer;
