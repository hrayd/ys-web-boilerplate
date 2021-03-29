import { message } from "antd";
import api from "../../api/api";
import { AsyncCallback } from "../../models/common";
import { Device } from "../../models/device";
import YSAxios, { isOk } from "../../utils/YSAxios";

export const asyncGetDeviceData = async (cb: AsyncCallback<Device[]>) => {
  const res = await YSAxios.get(api.device).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPostDevice = async (data: Device, cb: AsyncCallback<Device>) => {
  const res = await YSAxios.post(api.device, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPutDevice = async (data: Device, cb: AsyncCallback<Device>) => {
  const res = await YSAxios.put(`${api.device}/${data.id}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncDelDevice = async (data: Device, cb: AsyncCallback<Device>) => {
  const res = await YSAxios.delete(`${api.device}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncToggleDeviceStatus = async (
  data: Device,
  cb: AsyncCallback<Device>
) => {
  const newStatus = data.status === 1 ? 0 : 1;
  const res = await YSAxios.patch(`${api.device}/${data.id}/${newStatus}`).catch(
    (e) => {
      message.error(e.message);
      return e;
    }
  );
  cb({ isOk: isOk(res), data: { ...data, status: newStatus } });
};

export const asyncResetDevicePwd = async (
  data: Device,
  cb: AsyncCallback<Device>
) => {
  const res = await YSAxios.get(`${api.device}/${data.id}/reset`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const filterDevice = (
  data: Device[],
  params: Record<string, unknown>
): Device[] => {
  let result: Device[] = [...data];
  const { name } = params;
  if (name) {
    result = result.filter((r) => r.name.includes(name as string));
  }
  return result;
};
