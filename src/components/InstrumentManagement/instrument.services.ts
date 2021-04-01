import { message } from "antd";
import api from "../../api/api";
import { AsyncCallback } from "../../models/common";
import { Instrument } from "../../models/instrument";
import YSAxios, { isOk } from "../../utils/YSAxios";
import { Dayjs } from "dayjs";

export const asyncGetInstrumentData = async (
  cb: AsyncCallback<Instrument[]>
) => {
  const res = await YSAxios.get(api.instrument).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPostInstrument = async (
  data: Instrument,
  cb: AsyncCallback<Instrument>
) => {
  const res = await YSAxios.post(api.instrument, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPutInstrument = async (
  data: Instrument,
  cb: AsyncCallback<Instrument>
) => {
  const res = await YSAxios.put(`${api.instrument}/${data.id}`, data).catch(
    (e) => {
      message.error(e.message);
      return e;
    }
  );
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncDelInstrument = async (
  data: Instrument,
  cb: AsyncCallback<Instrument>
) => {
  const res = await YSAxios.delete(`${api.instrument}/${data.id}`).catch(
    (e) => {
      message.error(e.message);
      return e;
    }
  );
  cb({ isOk: isOk(res), data: res?.data });
};

// 查询过滤方法
export const filterInstrument = (
  data: Instrument[],
  params: Record<string, unknown>
): Instrument[] => {
  let result: Instrument[] = [...data];
  const { name, code, model, manufacturer, unit, person, status } = params;
  const lastTraceDate = params.lastTraceDate as null | [Dayjs, Dayjs];
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
  if (lastTraceDate && lastTraceDate[0]) {
    const lastTraceDateBegin = lastTraceDate[0].startOf("day").valueOf();
    const lastTraceDateEnd = lastTraceDate[1].endOf("day").valueOf();
    result = result.filter(
      (r) =>
        r.lastTraceDate >= lastTraceDateBegin &&
        r.lastTraceDate <= lastTraceDateEnd
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
