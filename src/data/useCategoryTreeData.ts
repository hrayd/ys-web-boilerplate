import useSWR from "swr";
import api from "../api/api";
import { Category } from "../models/category";
import { Dict } from "../models/common";
import YSAxios, { isOk } from "../utils/YSAxios";

const fetcher = async () => {
  const standardRes = await YSAxios.get(api.standard);
  const categoryRes = await YSAxios.get(api.category);
  if (isOk(standardRes) && isOk(categoryRes) && standardRes.data.length) {
    return [
      ...standardRes.data.map((d: Dict) => ({
        ...d,
        pid: null,
        pId: null,
        id: `${d.id}`,
        title: d.name,
      })),
      ...categoryRes.data.map((c: Category) => ({
        ...c,
        pId: c.pid,
        title: c.name,
      })),
    ];
  }
  return [];
};

const useCategoryTreeData = () => {
  const { data, error } = useSWR<Category[]>(api.category, fetcher);
  return { data: data || [], error };
};

export default useCategoryTreeData;
