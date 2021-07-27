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

const Demo: FC = () => {
  const { data, loading } = useDemoData();
  const [item, setItem] = useState<IDemo>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const reloadData = useCallback(() => mutate(api.demo), []);

  useEffect(() => {
    reloadData();
  }, [reloadData]);

  const onAdd = useCallback(() => {
    setFormVisible(true);
  }, []);

  const onEdit = useCallback((editItem: IDemo) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback(
    (data: IDemo) => {
      asyncDelDemo(data, reloadData);
    },
    [reloadData]
  );

  const editCallback = useCallback(() => {
    onClose();
    reloadData();
  }, [onClose, reloadData]);

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
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={reloadData}
      />
      <DemoForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
      />
    </StyledContainer>
  );
};

export default Demo;
