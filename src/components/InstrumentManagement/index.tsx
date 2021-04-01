/**
 * 检定标准管理
 * @author donghui
 */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import InstrumentSearch from "./InstrumentSearch";
import InstrumentTable from "./InstrumentTable";
import { Instrument } from "../../models/instrument";
import {
  asyncDelInstrument,
  asyncGetInstrumentData,
  asyncPostInstrument,
  asyncPutInstrument,
  filterInstrument,
} from "./instrument.services";
import InstrumentForm from "./InstrumentForm";
import { message } from "antd";

const InstrumentManagement: FC = () => {
  const [list, setList] = useState<Instrument[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Instrument>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetInstrumentData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
  }, []);

  useEffect(() => {
    loadData();
    return () => setList([]);
  }, [loadData]);

  const onAdd = useCallback(() => {
    setFormVisible(true);
  }, []);

  const onEdit = useCallback((editItem: Instrument) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback((data: Instrument) => {
    asyncDelInstrument(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);

  const onSave = useCallback(
    (data: Instrument) => {
      setLoading(true);
      if (data.id) {
        asyncPutInstrument(data, (res) => {
          setLoading(false);
          if (res.isOk) {
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
          }
        });
      } else {
        asyncPostInstrument(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            message.success("新增成功");
            setList((prev) => [res.data, ...prev]);
            onClose();
          }
        });
      }
    },
    [onClose]
  );

  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    setParams(newParams);
  }, []);

  const onRefresh = useCallback(() => loadData(), [loadData]);

  const filteredList = useMemo(() => {
    if (!params || !Object.keys(params).length) {
      return list;
    }
    return filterInstrument(list, params);
  }, [params, list]);

  return (
    <StyledContainer>
      <InstrumentSearch onSearch={onSearch} />
      <InstrumentTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={onRefresh}
      />
      <InstrumentForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
      />
    </StyledContainer>
  );
};

export default InstrumentManagement;
