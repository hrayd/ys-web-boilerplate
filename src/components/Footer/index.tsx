/** 底部Footer */
import { FC } from "react";
import styled from "styled-components";

interface Props {
  copyright: string;
}

const StyledFooter = styled.div`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: grey;
`;

const Footer: FC<Props> = ({ copyright }) => {
  return (
    <StyledFooter>
      {"Copyright ©️ "} {copyright}
    </StyledFooter>
  );
};

export default Footer;
