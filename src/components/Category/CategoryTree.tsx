import { Button, Tree } from "antd";
import { FC, useCallback, useMemo } from "react";
import { Category } from "../../models/category";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Modal } from "antd";
import { useTranslation } from "react-i18next";
import useStandards from "../../data/useStandards";

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
      return <TreeNode key={lm.id} title={lm.name} isLeaf />;
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
  const { data: standardList } = useStandards();

  const tree = useMemo(() => {
    if (!standardList?.length) {
      return null;
    }
    const treeDataWithStandards = [
      ...treeData,
      ...standardList.map((s) => ({ ...s, pid: null } as Category)),
    ];
    return (
      <Tree
        showIcon
        defaultExpandAll
        onSelect={(keys) => onSelect(keys[0] as string | undefined)}
      >
        {getTreeNodes(treeDataWithStandards, null)}
      </Tree>
    );
  }, [treeData, onSelect, standardList]);

  const handleDelete = useCallback(() => {
    Modal.confirm({
      title: t("common:confirmDelete"),
      content: t("deleteInfo"),
      onOk: onDel,
    });
  }, [onDel, t]);

  const btns = useMemo(() => {
    return (
      <>
        <Button
          type="link"
          title={t("common:add")}
          onClick={onAdd}
          icon={<PlusOutlined />}
        >
          {t("common:add")}
        </Button>
        <Button
          type="link"
          title={selectedId ? t("common:edit") : t("noSelectedItem")}
          onClick={onEdit}
          icon={<EditOutlined />}
          disabled={!selectedId}
        >
          {t("common:edit")}
        </Button>
        <Button
          type="link"
          title={selectedId ? t("common:delete") : t("noSelectedItem")}
          onClick={handleDelete}
          icon={<DeleteOutlined />}
          disabled={!selectedId}
        >
          {t("common:delete")}
        </Button>
      </>
    );
  }, [selectedId, onAdd, onEdit, handleDelete, t]);

  return (
    <>
      <StyledCategoryHeader>
        <StyledCategoryTitle>{t("title")}</StyledCategoryTitle>
        <StyledCategoryBtns>{btns}</StyledCategoryBtns>
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
  display: flex;
  flex-direction: row;
`;

const StyledCategoryTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const StyledCategoryBtns = styled.div`
  display: inline-block;
  text-align: right;
  flex: 1;
`;

export default CategoryTree;
