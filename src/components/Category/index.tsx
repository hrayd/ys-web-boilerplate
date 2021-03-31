/**
 * 设备类别管理
 * @author donghui
 */
import { message, Spin } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Category } from "../../models/category";
import { StyledContainer } from "../StyledComponents";
import {
  asyncDelCategory,
  asyncGetCategoryData,
  asyncPostCategory,
  asyncPutCategory,
} from "./category.services";
import CategoryForm from "./CategoryForm";
import CategoryTree from "./CategoryTree";

const CategoryContainer: FC = () => {
  const [list, setList] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<string>();
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState<Category>();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");

  const loadList = useCallback(() => {
    setLoading(true);
    asyncGetCategoryData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const onCloseForm = useCallback(() => {
    setFormVisible(false);
    setFormData(undefined);
  }, []);

  const onSaveForm = useCallback(
    (item: Category) => {
      setLoading(true);
      if (item.id) {
        asyncPutCategory(item, (res) => {
          setLoading(false);
          if (res.isOk) {
            onCloseForm();
            setList((prev) =>
              prev.map((pm) => {
                if (pm.id === item.id) {
                  return res.data;
                }
                return pm;
              })
            );
          }
        });
      } else {
        asyncPostCategory(item, (res) => {
          setLoading(false);
          if (res.isOk) {
            setList((prev) => [...prev, res.data]);
            onCloseForm();
          }
        });
      }
    },
    [onCloseForm]
  );

  const onAdd = useCallback(() => setFormVisible(true), []);

  const onEdit = useCallback(() => {
    if (selectedId) {
      setFormData(list.find((lf) => lf.id === selectedId));
      setFormVisible(true);
    }
  }, [list, selectedId]);

  const onDel = useCallback(() => {
    if (selectedId) {
      setLoading(true);
      asyncDelCategory(selectedId, (res) => {
        if (res.isOk) {
          message.success(t("deleteSuccess"));
          setList((prev) => prev.filter((pf) => pf.id !== selectedId));
          setSelectedId(undefined);
          setLoading(false);
        }
      });
    }
  }, [selectedId, t]);

  return (
    <StyledContainer direction="row">
      <StyledTree>
        <Spin spinning={loading}>
          <CategoryTree
            treeData={list}
            onSelect={setSelectedId}
            selectedId={selectedId}
            onAdd={onAdd}
            onEdit={onEdit}
            onDel={onDel}
          />
        </Spin>
      </StyledTree>
      <StyledContent></StyledContent>
      <CategoryForm
        visible={formVisible}
        item={formData}
        onClose={onCloseForm}
        onSave={onSaveForm}
        categoryList={list}
        selectedId={selectedId}
      />
    </StyledContainer>
  );
};

export default CategoryContainer;

const StyledTree = styled.div`
  width: 25rem;
`;

const StyledContent = styled.div`
  flex: 1;
`;
