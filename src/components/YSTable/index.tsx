/**
 * 公共表格组件
 */
import { Button, Dropdown, Menu, Table, TableProps, Tooltip } from "antd";
import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import {
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
} from "@ant-design/icons";

interface Props<RecordType = any> extends TableProps<RecordType> {
  tableTitle?: string;
  onAdd?: () => void;
  onReload?: () => void;
  showSizeChanger?: boolean;
  showColumnsChanger?: boolean;
}

const sizeMap = [
  { key: "default", label: "默认" },
  { key: "middle", label: "中等" },
  { key: "small", label: "紧凑" },
];

const YSTable: FC<Props> = ({
  tableTitle,
  onAdd,
  onReload,
  showSizeChanger = true,
  showColumnsChanger = true,
  ...tableProps
}) => {
  const [tableSize, setTableSize] = useState(sizeMap[0].key);

  const sizeOverLay = useMemo(
    () => (
      <Menu onClick={(info) => setTableSize(info.key as string)} selectedKeys={[tableSize]}>
        {sizeMap.map((s) => (
          <Menu.Item key={s.key}>{s.label}</Menu.Item>
        ))}
      </Menu>
    ),
    [tableSize]
  );

  return (
    <StyledTable>
      <StyledTableHeader>
        <div style={{ flex: 1 }}>{tableTitle || ""}</div>
        <div style={{ flex: 1, textAlign: "right" }}>
          {onAdd ? (
            <Button type="primary" onClick={onAdd} title="新建">
              <PlusOutlined /> 新建
            </Button>
          ) : null}
          {onReload ? (
            <Tooltip title="刷新">
              <ReloadOutlined
                style={{ marginLeft: "1rem", cursor: "pointer" }}
                onClick={onReload}
              />
            </Tooltip>
          ) : null}
          {showSizeChanger ? (
            <Tooltip title="密度">
              <Dropdown overlay={sizeOverLay} trigger={["click"]}>
                <ColumnHeightOutlined style={{ marginLeft: "1rem", cursor: "pointer" }} />
              </Dropdown>
            </Tooltip>
          ) : null}
          {showColumnsChanger ? (
            <Tooltip title="列设置">
              <SettingOutlined style={{ marginLeft: "1rem", cursor: "pointer" }} />
            </Tooltip>
          ) : null}
        </div>
      </StyledTableHeader>
      <Table
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
        }}
        // @ts-ignore
        size={tableSize}
        {...tableProps}
      />
    </StyledTable>
  );
};

const StyledTable = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 1rem;
`;

const StyledTableHeader = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: row;
`;

export default YSTable;
