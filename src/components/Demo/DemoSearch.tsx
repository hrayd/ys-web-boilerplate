import { FC } from "react";
import SearchBar from "../SearchBar";

const DemoSearch: FC = () => {
  return <SearchBar items={[
    { name: 'name', label: '名称' },
    { name: 'code', label: '编码' },
    { name: 'name1', label: '名称1' },
    { name: 'name2', label: '名称2' },
  ]} />
};

export default DemoSearch;
