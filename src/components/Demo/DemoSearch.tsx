import { FC } from "react";
import YSSearchBar from "../YSSearchBar";

const DemoSearch: FC = () => {
  return (
    <YSSearchBar
      items={[
        { name: "name", label: "名称" },
        { name: "code", label: "编码" },
        { name: "name1", label: "名称1" },
        { name: "name2", label: "名称2" },
      ]}
      onSearch={() => {}}
    />
  );
};

export default DemoSearch;
