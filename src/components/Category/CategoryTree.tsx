import { Button, Dropdown, Tree, Menu } from "antd";
import { FC, useMemo } from "react";
import { Category } from "../../models/category";
import {
  EnvironmentOutlined,
  DownOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

interface Props {
  treeData: Category[];
  onSelect: (key?: string) => void;
  selectedId?: string;
}

const TreeNode = Tree.TreeNode;

const getTreeNodes = (list: Category[], pid: null | string) => {
  return list
    .filter((l) => l.pid === pid)
    .map((lm) => {
      if (list.find((lf) => lf.pid === lm.id)) {
        return (
          <TreeNode key={lm.id} title={lm.name}>
            {getTreeNodes(list, lm.id)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          key={lm.id}
          title={lm.name}
          isLeaf
          icon={<EnvironmentOutlined />}
        />
      );
    });
};

const CategoryTree: FC<Props> = ({ treeData, onSelect, selectedId }) => {
  const tree = useMemo(() => {
    if (treeData.length) {
      return (
        <Tree
          defaultExpandAll
          showIcon
          onSelect={(keys) => onSelect(keys[0] as string | undefined)}
        >
          {getTreeNodes(treeData, null)}
        </Tree>
      );
    }
    return null;
  }, [treeData, onSelect]);

  const operationsOverlay = useMemo(() => {
    return (
      <Menu>
        <Menu.Item title="新建">
          <PlusOutlined />
          新建
        </Menu.Item>
        <Menu.Item disabled={!selectedId} title={selectedId ? "编辑" : "无选中项"}>
          <EditOutlined />
          编辑
        </Menu.Item>
        <Menu.Item disabled={!selectedId} title={selectedId ? "删除" : "无选中项"}>
          <DeleteOutlined />
          删除
        </Menu.Item>
      </Menu>
    );
  }, [selectedId]);

  return (
    <>
      <StyledCategoryHeader>
        <StyledCategoryTitle>设备类别</StyledCategoryTitle>
        <Dropdown overlay={operationsOverlay}>
          <Button type="link" style={{ float: "right", paddingTop: ".5rem" }}>
            操作 <DownOutlined />
          </Button>
        </Dropdown>
      </StyledCategoryHeader>
      {tree}
    </>
  );
};

const StyledCategoryHeader = styled.div`
  height: 2.5rem;
  line-height: 2.5rem;
  border-bottom: 1px dashed grey;
  margin-bottom: 1rem;
`;

const StyledCategoryTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export default CategoryTree;
