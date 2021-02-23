import { FC } from "react";
import YSTable from "../YSTable";

const mockData = () => {
  const result = [];
  for (let i = 1; i < 40; i++) {
    result.push({
      id: i,
      name: `NAME ${i}`,
      code: `CODE ${i}`,
    });
  }
  return result;
};

const DemoTable: FC = () => {
  return (
    <YSTable
      rowKey="id"
      dataSource={mockData()}
      columns={[
        { title: "名称", dataIndex: "name" },
        { title: "编码", dataIndex: "code" },
      ]}
      tableTitle="数据列表"
      onAdd={() => {}}
      onReload={() => {}}
    />
  );
};

export default DemoTable;
