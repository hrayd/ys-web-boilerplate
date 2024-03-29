/**
 * useSWR demo
 * 公共列表可使用useSWR实现
 */
import log from "loglevel";
import useSWR from "swr";
import api from "../configs/api";
import { IDemo } from "../models/demo";
import request from "../utils/request";

const useDemoData = (params?: Record<string, unknown>) => {
  const { data, error } = useSWR<IDemo[]>(api.demo, (url) =>
    request.get(url, { params }).then((res) => res.data)
  );

  if (error) log.error(error);

  return {
    data: data || [],
    error,
    loading: !error && !data,
  };
};

export default useDemoData;
