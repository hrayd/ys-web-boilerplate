/**
 * useSWR user
 * 公共列表可使用useSWR实现
 */
import useSWR from "swr";
import api from "../api/api";
import { User } from "../models/user";
import YSAxios from "../utils/YSAxios";

const useDemo = (params?: Record<string, unknown>) => {
  const { data, error } = useSWR<User[]>(api.user, (url) =>
    YSAxios.get(url, { params }).then((res) => res.data)
  );

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};

export default useDemo;
