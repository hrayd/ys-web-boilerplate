/** 底部Footer */
import { FC } from "react";
import styled from "styled-components";

interface Props {
  content?: string;
}

const StyledFooter = styled.div`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  color: grey;
`;

const Footer: FC<Props> = ({ content }) => {
  if (!content) return null;
  return <StyledFooter>{content}</StyledFooter>;
};

export default Footer;
