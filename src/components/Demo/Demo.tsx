import { FC, useEffect, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import DemoSearch from "./DemoSearch";
import DemoTable from "./DemoTable";
import { IDemo } from "../../models/demo";
import { asyncGetDemoData } from "./demo.services";

const Demo: FC = () => {
  const [list, setList] = useState<IDemo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    asyncGetDemoData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
    return () => setList([]);
  }, []);

  return (
    <StyledContainer>
      <DemoSearch />
      <DemoTable data={list} loading={loading} />
    </StyledContainer>
  );
};

export default Demo;
