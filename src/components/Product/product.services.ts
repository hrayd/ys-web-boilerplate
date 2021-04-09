import { message } from "antd";
import api from "../../configs/api";
import { AsyncCallback } from "../../models/common";
import { Product } from "../../models/product";
import YSAxios, { callback } from "../../utils/YSAxios";

export const asyncGetProductData = async (cb: AsyncCallback) => {
  const res = await YSAxios.get(api.product).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, []);
};

export const asyncPostProduct = async (data: Product, cb: AsyncCallback) => {
  const res = await YSAxios.post(api.product, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb, {});
};

export const asyncPutProduct = async (data: Product, cb: AsyncCallback) => {
  const res = await YSAxios.put(`${api.product}/${data.id}`, data).catch(
    (e) => {
      message.error(e.message);
      return e;
    }
  );
  callback(res, cb, data);
};

export const asyncDelProduct = async (data: Product, cb: AsyncCallback) => {
  const res = await YSAxios.delete(`${api.product}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  callback(res, cb);
};
