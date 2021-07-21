import { message } from "antd";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import log from "loglevel";
import { BASE_URL } from "./apiUtils";
import history from "./history";
import { setPreLocation } from "./preLocationUtils";
import { clearToken, getToken } from "./tokenUtils";

const request = axios.create({ baseURL: BASE_URL });

const clearAndBackLogin = () => {
  clearToken();
  setPreLocation();
  history.push("/login");
};

// Response成功的拦截器，用于处理返回数据
const onFullFilled = (response: AxiosResponse) => response;

// Response失败的拦截器，用于错误处理
const onRejected = (err: any): Promise<void> => {
  log.error("NETWORK REJECTED: ", `${err}`);
  let msg = "操作失败";
  if (err.response && err.response.data && err.response.data.code) {
    const { code, message } = err.response.data;
    msg = `错误 ${code}: ${message || "Unknown"}`;
  }
  if (err.response) {
    switch (err.response.status) {
      case 401:
      case 502:
        msg = "请重新登录";
        clearAndBackLogin();
        return new Promise(() => {});
      default:
        break;
    }
  }
  message.error(msg);
  return Promise.reject(err);
};

// Request拦截器
const requestOnFullFilled = (
  request: AxiosRequestConfig
): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
  const token = getToken();
  if (token) {
    return Object.assign(request, {
      headers: { ...request.headers, Authorization: token },
    });
  }
  message.info("请重新登录");
  clearAndBackLogin();
  return new Promise(() => {});
};

request.interceptors.request.use(requestOnFullFilled);
request.interceptors.response.use(onFullFilled, onRejected);

export default request;

export const requestDownload = (
  url: string,
  method: Method = "get",
  data?: any
) => {
  return request({
    method,
    url,
    data,
    responseType: "blob",
    headers: {
      Accept: "application/octet-stream,application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};
