import { message } from "antd";
import api from "../../configs/api";
import i18n from "../../i18n";
import { Callback } from "../../models/common";
import { IDemo } from "../../models/demo";
import request from "../../utils/request";

const callSuccess = (msg?: string) =>
  message.success(msg || i18n.t("common:optSuccess"));

export const asyncGetDemoData = (params?: any) =>
  request({
    method: "get",
    url: api.demo,
    params,
  });

export const asyncPostDemo = async (data: IDemo, cb: Callback) => {
  const res = await request({
    method: "post",
    url: api.demo,
    data,
  });
  callSuccess();
  cb(res.data);
};

export const asyncPutDemo = async (data: IDemo, cb: Callback) => {
  const res = await request({
    method: "put",
    url: `${api.demo}/${data.id}`,
    data,
  });
  callSuccess();
  cb(res.data);
};

export const asyncDelDemo = async (data: IDemo, cb: Callback) => {
  const res = await request({
    method: "delete",
    url: `${api.demo}/${data.id}`,
  });
  callSuccess();
  cb(res.data);
};

export const filterDemoList = (
  data: IDemo[],
  params?: Record<string, unknown>
): IDemo[] => {
  if (!params || !Object.keys(params).length) {
    return data;
  }
  let result = [...data];
  if (params.name) {
    result = result.filter((r) => r.name.includes(params.name as string));
  }
  if (params.sex !== undefined) {
    result = result.filter((r) => r.sex === params.sex);
  }
  return result;
};
