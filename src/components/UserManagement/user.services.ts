import { message } from "antd";
import api from "../../api/api";
import { AsyncCallback } from "../../models/common";
import { User } from "../../models/user";
import YSAxios, { isOk } from "../../utils/YSAxios";

export const asyncGetUserData = async (cb: AsyncCallback<User[]>) => {
  const res = await YSAxios.get(api.user).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPostUser = async (data: User, cb: AsyncCallback<User>) => {
  const res = await YSAxios.post(api.user, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncPutUser = async (data: User, cb: AsyncCallback<User>) => {
  const res = await YSAxios.put(`${api.user}/${data.id}`, data).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncDelUser = async (data: User, cb: AsyncCallback<User>) => {
  const res = await YSAxios.delete(`${api.user}/${data.id}`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const asyncToggleUserStatus = async (
  data: User,
  cb: AsyncCallback<User>
) => {
  const newStatus = data.status === 1 ? 0 : 1;
  const res = await YSAxios.patch(`${api.user}/${data.id}/${newStatus}`).catch(
    (e) => {
      message.error(e.message);
      return e;
    }
  );
  cb({ isOk: isOk(res), data: { ...data, status: newStatus } });
};

export const asyncResetUserPwd = async (
  data: User,
  cb: AsyncCallback<User>
) => {
  const res = await YSAxios.get(`${api.user}/${data.id}/reset`).catch((e) => {
    message.error(e.message);
    return e;
  });
  cb({ isOk: isOk(res), data: res?.data });
};

export const filterUser = (
  data: User[],
  params: Record<string, unknown>
): User[] => {
  let result: User[] = [...data];
  const { name, major, status, rule, username, department, position } = params;
  if (name) {
    result = result.filter((r) => r.name.includes(name as string));
  }
  if (major) {
    result = result.filter((r) => r.major.includes(major as string));
  }
  if (typeof status === "number") {
    result = result.filter((r) => r.status === status);
  }
  if (typeof rule === "number") {
    result = result.filter((r) => r.rule === rule);
  }
  if (username) {
    result = result.filter((r) => r.username.includes(username as string));
  }
  if (department) {
    result = result.filter((r) => r.department.includes(department as string));
  }
  if (position) {
    result = result.filter((r) => r.position.includes(position as string));
  }
  return result;
};
