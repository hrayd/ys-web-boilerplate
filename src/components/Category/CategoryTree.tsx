import { Button, Dropdown, Tree, Menu } from "antd";
import { FC, useCallback, useMemo } from "react";
import { Category } from "../../models/category";
import {
  EnvironmentOutlined,
  DownOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { Modal } from "antd";

interface Props {
  treeData: Category[];
  onSelect: (key?: string) => void;
  selectedId?: string;
  onAdd: () => void;
  onEdit: () => void;
  onDel: () => void;
}

const TreeNode = Tree.TreeNode;

//#region 生成树
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
//#endregion

const CategoryTree: FC<Props> = ({
  treeData,
  onSelect,
  selectedId,
  onAdd,
  onEdit,
  onDel,
}) => {
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

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: "确认删除?",
      content: "如果存在子节点，也将一并删除",
      onOk: onDel,
    });
  }, [onDel]);

  const operationsOverlay = useMemo(() => {
    return (
      <Menu>
        <Menu.Item title="新建" onClick={onAdd}>
          <PlusOutlined />
          新建
        </Menu.Item>
        <Menu.Item
          disabled={!selectedId}
          title={selectedId ? "编辑" : "无选中项"}
          onClick={onEdit}
        >
          <EditOutlined />
          编辑
        </Menu.Item>
        <Menu.Item
          disabled={!selectedId}
          title={selectedId ? "删除" : "无选中项"}
          onClick={handleDelete}
        >
          <DeleteOutlined />
          删除
        </Menu.Item>
      </Menu>
    );
  }, [selectedId, onAdd, onEdit, handleDelete]);

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
