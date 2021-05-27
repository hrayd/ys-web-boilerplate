import api from "../../configs/api";
import { IDemo } from "../../models/demo";
import request from "../../utils/request";

export const asyncGetDemoData = (params?: any) =>
  request({
    method: "get",
    url: api.demo,
    params,
  });

export const asyncPostDemo = (data: IDemo) =>
  request({
    method: "post",
    url: api.demo,
    data,
  });

export const asyncPutDemo = (data: IDemo) =>
  request({
    method: "put",
    url: `${api.demo}/${data.id}`,
    data,
  });

export const asyncDelDemo = (data: IDemo) =>
  request({
    method: "delete",
    url: `${api.demo}/${data.id}`,
  });
