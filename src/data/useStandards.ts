/**
 * 检定标准数据列表
 */
import useSWR from "swr";
import api from "../api/api";
import { Dict } from "../models/common";
import YSAxios from "../utils/YSAxios";

const useStandards = () => {
  const { data, error } = useSWR<Dict[]>(api.standard, (url) =>
    YSAxios.get(url).then((res) => res.data)
  );

  return {
    data: data || [],
    error,
    isLoading: !error && !data,
  };
};

export default useStandards;
