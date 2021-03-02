import { FC, useCallback, useEffect, useState } from "react";
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

  useEffect(() => {
    asyncGetDemoData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
    return () => setList([]);
  }, []);

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

  const onDel = useCallback((data: IDemo) => {
    asyncDelDemo(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);

  const onSave = useCallback(
    (data: IDemo) => {
      setLoading(true);
      if (data.id) {
        asyncPutDemo(data, (res) => {
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
        asyncPostDemo(data, (res) => {
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

  return (
    <StyledContainer>
      <DemoSearch />
      <DemoTable
        data={list}
        loading={loading}
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
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
