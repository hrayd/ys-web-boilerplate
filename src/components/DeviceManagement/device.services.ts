import { message } from "antd";
import api from "../../api/api";
import { AsyncCallback } from "../../models/common";
import { Device } from "../../models/device";
import YSAxios, { isOk } from "../../utils/YSAxios";
import { Dayjs } from "dayjs";

export const asyncGetDeviceData = async (cb: AsyncCallback<Device[]>) => {
  const res = await YSAxios.get(api.device).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPostDevice = async (
  data: Device,
  cb: AsyncCallback<Device>
) => {
  const res = await YSAxios.post(api.device, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPutDevice = async (
  data: Device,
  cb: AsyncCallback<Device>
) => {
  const res = await YSAxios.put(`${api.device}/${data.id}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncDelDevice = async (
  data: Device,
  cb: AsyncCallback<Device>
) => {
  const res = await YSAxios.delete(`${api.device}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

// 查询过滤方法
export const filterDevice = (
  data: Device[],
  params: Record<string, unknown>
): Device[] => {
  let result: Device[] = [...data];
  const { name, code, model, manufacturer, unit, person, status } = params;
  const lastDate = params.lastDate as null | [Dayjs, Dayjs];
  const validDate = params.validDate as null | [Dayjs, Dayjs];
  if (name) {
    result = result.filter((r) => r.name.includes(name as string));
  }
  if (code) {
    result = result.filter((r) => r.code.includes(code as string));
  }
  if (model) {
    result = result.filter((r) => r.model.includes(model as string));
  }
  if (manufacturer) {
    result = result.filter((r) =>
      r.manufacturer.includes(manufacturer as string)
    );
  }
  if (unit) {
    result = result.filter((r) => r.unit.includes(unit as string));
  }
  if (person) {
    result = result.filter((r) => r.person.includes(person as string));
  }
  if (status) {
    result = result.filter((r) => r.status === status);
  }
  if (lastDate && lastDate[0]) {
    const lastDateBegin = lastDate[0].startOf("day").valueOf();
    const lastDateEnd = lastDate[1].endOf("day").valueOf();
    result = result.filter(
      (r) => r.lastDate >= lastDateBegin && r.lastDate <= lastDateEnd
    );
  }
  if (validDate && validDate[0]) {
    const validDateBegin = validDate[0].startOf("day").valueOf();
    const validDateEnd = validDate[1].endOf("day").valueOf();
    result = result.filter(
      (r) => r.validDate >= validDateBegin && r.validDate <= validDateEnd
    );
  }
  return result;
};
