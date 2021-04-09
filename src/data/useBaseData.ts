/**
 * 基础数据
 */
import log from "loglevel";
import useSWR from "swr";
import api from "../configs/api";
import { BaseData } from "../models/dict";
import YSAxios, { isOk } from "../utils/YSAxios";

const DEFAULT_BASE_DATA: BaseData = {
  fields: [],
  plType: [],
  arch: [],
};

const useBaseData = () => {
  const { data, error } = useSWR<BaseData>(api.baseData, async () => {
    const res = await YSAxios.get(api.baseData).catch((e) => {
      log.error(e);
      return e;
    });
    if (isOk(res)) {
      return res.data;
    } else {
      return DEFAULT_BASE_DATA;
    }
  });
  return {
    data,
    error,
  };
};

export default useBaseData;
