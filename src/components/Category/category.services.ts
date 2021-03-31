import { message } from "antd";
import api from "../../api/api";
import { AsyncCallback, Dict } from "../../models/common";
import { Category } from "../../models/category";
import YSAxios, { isOk } from "../../utils/YSAxios";

export const asyncGetCategoryData = async (cb: AsyncCallback<Category[]>) => {
  const res = await YSAxios.get(api.category).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPostCategory = async (
  data: Category,
  cb: AsyncCallback<Category>
) => {
  const res = await YSAxios.post(api.category, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPutCategory = async (
  data: Category,
  cb: AsyncCallback<Category>
) => {
  const res = await YSAxios.put(`${api.category}/${data.id}`, data).catch(
    (e) => {
      message.error(e.message);
      return e;
    }
  );
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncDelCategory = async (
  id: string,
  cb: AsyncCallback<Category>
) => {
  const res = await YSAxios.delete(`${api.category}/${id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const getCategoryTreeData = (
  standardList: Dict[],
  categoryList: Category[]
): Category[] => {
  if (!standardList.length) return [];
  return [
    ...standardList.map((s) => ({ ...s, pid: null, id: `${s.id}` })),
    ...categoryList,
  ];
};
