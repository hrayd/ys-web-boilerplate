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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["category", "common"]);

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
      title: t("common:confirmDelete"),
      content: t("deleteInfo"),
      onOk: onDel,
    });
  }, [onDel, t]);

  const operationsOverlay = useMemo(() => {
    return (
      <Menu>
        <Menu.Item title={t("common:add")} onClick={onAdd}>
          <PlusOutlined />
          {t("common:add")}
        </Menu.Item>
        <Menu.Item
          disabled={!selectedId}
          title={selectedId ? t("common:edit") : t("noSelectedItem")}
          onClick={onEdit}
        >
          <EditOutlined />
          {t("common:edit")}
        </Menu.Item>
        <Menu.Item
          disabled={!selectedId}
          title={selectedId ? t("common:delete") : t("noSelectedItem")}
          onClick={handleDelete}
        >
          <DeleteOutlined />
          删除
        </Menu.Item>
      </Menu>
    );
  }, [selectedId, onAdd, onEdit, handleDelete, t]);

  return (
    <>
      <StyledCategoryHeader>
        <StyledCategoryTitle>{t("title")}</StyledCategoryTitle>
        <Dropdown overlay={operationsOverlay}>
          <Button type="link" style={{ float: "right", paddingTop: ".5rem" }}>
            {t("common:operations")} <DownOutlined />
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
