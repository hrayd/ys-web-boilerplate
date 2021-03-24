import { message } from "antd";
import api from "../../api/api";
import { AsyncCallback } from "../../models/common";
import { Category } from "../../models/category";
import YSAxios, { isOk } from "../../utils/YSAxios";

export const asyncGetCategoryData = async (cb: AsyncCallback<Category[]>) => {
  const res = await YSAxios.get(api.category).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPostCategory = async (data: Category, cb: AsyncCallback<Category>) => {
  const res = await YSAxios.post(api.category, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPutCategory = async (data: Category, cb: AsyncCallback<Category>) => {
  const res = await YSAxios.put(`${api.category}/${data.id}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncDelCategory = async (data: Category, cb: AsyncCallback<Category>) => {
  const res = await YSAxios.delete(`${api.category}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};
