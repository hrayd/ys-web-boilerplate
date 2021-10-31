/**
 * 表格/表单Demo页面
 */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import DemoSearch from "./DemoSearch";
import DemoTable from "./DemoTable";
import { IDemo } from "../../models/demo";
import {
  asyncDelDemo,
  asyncPostDemo,
  asyncPutDemo,
  filterDemoList,
} from "./demo.services";
import DemoForm from "./DemoForm";
import useDemoData from "../../data/useDemoData";
import { mutate } from "swr";
import api from "../../configs/api";
import useFormState from "../../hooks/useFormState";

const Demo: FC = () => {
  const { data, loading } = useDemoData();
  const [params, setParams] = useState<Record<string, unknown>>();
  const {
    data: formData,
    visible: formVisible,
    open: openForm,
    close: closeForm,
  } = useFormState<IDemo>();

  const reloadData = useCallback(() => mutate(api.demo), []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const onDel = useCallback(
    (data: IDemo) => {
      asyncDelDemo(data, reloadData);
    },
    [reloadData]
  );

  const editCallback = useCallback(() => {
    closeForm();
    reloadData();
  }, [closeForm, reloadData]);

  const onSave = useCallback(
    (data: IDemo) => {
      if (data.id) {
        asyncPutDemo(data, editCallback);
      } else {
        asyncPostDemo(data, editCallback);
      }
    },
    [editCallback]
  );

  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    setParams(newParams);
  }, []);

  const filteredList = useMemo(
    () => filterDemoList(data, params),
    [params, data]
  );

  return (
    <StyledContainer>
      <DemoSearch onSearch={onSearch} />
      <DemoTable
        data={filteredList}
        loading={loading}
        onAdd={openForm}
        onEdit={openForm}
        onDel={onDel}
        onRefresh={reloadData}
      />
      <DemoForm
        visible={formVisible}
        item={formData}
        onSave={onSave}
        onCancel={closeForm}
      />
    </StyledContainer>
  );
};

export default Demo;
