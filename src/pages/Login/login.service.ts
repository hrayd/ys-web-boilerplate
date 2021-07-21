import api from "../../configs/api";
import { requestWithoutAuth } from "../../utils/request";

type Certificate = {
  username: string;
  password: string;
};

export const requestLogin = (certificate: Certificate) =>
  requestWithoutAuth.post(api.login, certificate);
