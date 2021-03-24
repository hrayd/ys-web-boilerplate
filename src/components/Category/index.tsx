/**
 * 设备类别管理
 * @author donghui
 */
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { Category } from "../../models/category";
import { StyledContainer } from "../StyledComponents";
import { asyncGetCategoryData } from "./category.services";
import CategoryTree from "./CategoryTree";

const CategoryContainer: FC = () => {
  const [list, setList] = useState<Category[]>([]);
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    asyncGetCategoryData(res => {
      if (res.isOk) {
        setList(res.data);
      }
    })
  }, []);

  return (
    <StyledContainer direction="row">
      <StyledTree>
        <CategoryTree treeData={list} onSelect={setSelectedId} selectedId={selectedId} />
      </StyledTree>
      <StyledContent></StyledContent>
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
