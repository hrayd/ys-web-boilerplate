import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import YSAxios, { callback } from "../../utils/YSAxios";

export const asyncGetDemoData = async (cb: AsyncCallback) => {
  const res = await YSAxios.get(api.demo).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};
