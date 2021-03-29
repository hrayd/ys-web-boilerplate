/**
 * 检定设备管理
 * @author donghui
 */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import DeviceSearch from "./DeviceSearch";
import DeviceTable from "./DeviceTable";
import { Device } from "../../models/device";
import {
  asyncDelDevice,
  asyncGetDeviceData,
  asyncPostDevice,
  asyncPutDevice,
  asyncResetDevicePwd,
  asyncToggleDeviceStatus,
  filterDevice,
} from "./device.services";
import DeviceForm from "./DeviceForm";
import { message } from "antd";

const DeviceManagement: FC = () => {
  const [list, setList] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Device>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetDeviceData((res) => {
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

  const onEdit = useCallback((editItem: Device) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback((data: Device) => {
    asyncDelDevice(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);

  const onSave = useCallback(
    (data: Device) => {
      setLoading(true);
      if (data.id) {
        asyncPutDevice(data, (res) => {
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
        asyncPostDevice(data, (res) => {
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

  const onToggleStatus = useCallback((data: Device) => {
    setLoading(true);
    asyncToggleDeviceStatus(data, (res) => {
      setLoading(false);
      if (res.isOk) {
        message.success("操作成功");
        setList((prev) =>
          prev.map((p) => {
            if (p.id === data.id) {
              return res.data;
            }
            return p;
          })
        );
      }
    });
  }, []);

  const onResetPwd = useCallback((data: Device) => {
    setLoading(true);
    asyncResetDevicePwd(data, (res) => {
      setLoading(false);
      if (res.isOk) {
        message.success("密码重置成功，新密码与用户名相同", 3);
      }
    });
  }, []);

  const filteredList = useMemo(() => {
    if (!params || !Object.keys(params).length) {
      return list;
    }
    return filterDevice(list, params);
  }, [params, list]);

  return (
    <StyledContainer>
      <DeviceSearch onSearch={onSearch} />
      <DeviceTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={onRefresh}
        onToggleStatus={onToggleStatus}
        onResetPwd={onResetPwd}
      />
      <DeviceForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
      />
    </StyledContainer>
  );
};

export default DeviceManagement;
