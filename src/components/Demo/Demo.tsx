import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import DemoSearch from "./DemoSearch";
import DemoTable from "./DemoTable";
import { IDemo } from "../../models/demo";
import {
  asyncDelDemo,
  asyncGetDemoData,
  asyncPostDemo,
  asyncPutDemo,
} from "./demo.services";
import DemoForm from "./DemoForm";
import { message } from "antd";

const Demo: FC = () => {
  const [list, setList] = useState<IDemo[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<IDemo>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await asyncGetDemoData();
      setLoading(false);
      setList(res.data);
    } catch {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    return () => setList([]);
  }, [loadData]);

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

  const onDel = useCallback(async (data: IDemo) => {
    setLoading(true);
    try {
      await asyncDelDemo(data);
      message.success("删除成功");
      setList((prev) => prev.filter((p) => p.id !== data.id));
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, []);

  const onSave = useCallback(
    async (data: IDemo) => {
      setLoading(true);
      try {
        if (data.id) {
          const res = await asyncPutDemo(data);
          message.success("编辑成功");
          setList((prev) =>
            prev.map((p) => {
              if (p.id === data.id) {
                return res.data;
              }
              return p;
            })
          );
          onClose();
          setLoading(false);
        } else {
          const res = await asyncPostDemo(data);
          message.success("新增成功");
          setList((prev) => [res.data, ...prev]);
          onClose();
          setLoading(false);
        }
      } catch {
        setLoading(false);
      }
    },
    [onClose]
  );

  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    setParams(newParams);
  }, []);

  const onRefresh = useCallback(() => loadData(), [loadData]);

  const filteredList = useMemo(() => {
    if (!params) {
      return list;
    }
    let result = [...list];
    if (params.name) {
      result = result.filter((r) => r.name.includes(params.name as string));
    }
    if (params.sex !== undefined) {
      result = result.filter((r) => r.sex === params.sex);
    }
    return result;
  }, [params, list]);

  return (
    <StyledContainer>
      <DemoSearch onSearch={onSearch} />
      <DemoTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={onRefresh}
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
