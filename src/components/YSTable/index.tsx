/**
 * 公共表格组件（前端分页）
 */
import {
  Button,
  Dropdown,
  Menu,
  Table,
  TablePaginationConfig,
  TableProps,
  Tooltip,
} from "antd";
import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import {
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  ColumnHeightOutlined,
} from "@ant-design/icons";

interface Props<RecordType = any> extends TableProps<RecordType> {
  dataSource: RecordType[];
  tableTitle?: string;
  onAdd?: () => void; // 设置之后展示新建按钮
  onReload?: () => void; // 设置之后展示刷新按钮
  showSizeChanger?: boolean;
  // TODO: 设置之后展示列项编辑功能
  showColumnsChanger?: boolean;
}

const sizeMap = [
  { key: "default", label: "默认" },
  { key: "middle", label: "中等" },
  { key: "small", label: "紧凑" },
];

const DEFAULT_PAGE_SIZE = 20;

const YSTable: FC<Props> = ({
  dataSource,
  tableTitle,
  onAdd,
  onReload,
  showSizeChanger = true,
  showColumnsChanger,
  ...tableProps
}) => {
  const [tableSize, setTableSize] = useState(sizeMap[0].key);

  // 提取出需要修改的属性，其他的属性直接放入Table组件
  const { pagination, ...otherTableProps } = tableProps;

  const sizeOverLay = useMemo(
    () => (
      <Menu
        onClick={(info) => setTableSize(info.key as string)}
        selectedKeys={[tableSize]}
      >
        {sizeMap.map((s) => (
          <Menu.Item key={s.key}>{s.label}</Menu.Item>
        ))}
      </Menu>
    ),
    [tableSize]
  );

  const paginationConfig: TablePaginationConfig = {
    showSizeChanger: true,
    defaultPageSize: DEFAULT_PAGE_SIZE,
    showTotal: (total, range) =>
      `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`,
    ...pagination,
  };

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
                <ColumnHeightOutlined
                  style={{ marginLeft: "1rem", cursor: "pointer" }}
                />
              </Dropdown>
            </Tooltip>
          ) : null}
          {showColumnsChanger ? (
            <Tooltip title="列设置">
              <SettingOutlined
                style={{ marginLeft: "1rem", cursor: "pointer" }}
              />
            </Tooltip>
          ) : null}
        </div>
      </StyledTableHeader>
      <Table
        dataSource={dataSource}
        pagination={paginationConfig}
        // @ts-ignore
        size={tableSize}
        {...otherTableProps}
      />
    </StyledTable>
  );
};

const StyledTable = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
