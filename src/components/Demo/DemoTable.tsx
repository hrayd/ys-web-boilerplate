import { Table } from "antd";
import { FC } from "react";
import StyledTable from "../StyledComponents/StyledTable";

const mockData = () => {
  const result = [];
  for (let i = 1; i < 40; i++) {
    result.push({
      id: i,
      name: `NAME ${i}`,
      code: `CODE ${i}`,
    })
  }
  return result;
};

const DemoTable: FC = () => {
  return (
    <StyledTable>
      <Table
        rowKey="id"
        dataSource={mockData()}
        columns={[
          { title: '名称', dataIndex: 'name' },
          { title: '编码', dataIndex: 'code' },
        ]}
        pagination={{
          showSizeChanger: true,
        }}
      />
    </StyledTable>
  )
}

export default DemoTable;
