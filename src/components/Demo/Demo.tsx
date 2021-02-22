import { FC } from "react";
import { StyledContainer } from "../StyledComponents";
import DemoSearch from "./DemoSearch";
import DemoTable from "./DemoTable";

const Demo: FC = () => {
  return (
    <StyledContainer>
      <DemoSearch />
      <DemoTable />
    </StyledContainer>
  )
};

export default Demo;
