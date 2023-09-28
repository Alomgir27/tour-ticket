import { ApiBase } from "../../../Helper/ApiBase";
import { request } from "../../../Service/ApiServices";

export const authRepository = {
  login: async (data) => {
    const res = await request({
      axiosConfig: {
        method: "POST",
        headers: {
          "csrf-token": "{{ csrf_token() }}",
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/login`,
        data: data,
      },
    });
    return res ?? null;
  },
  logout: async () => {
    const authToken = localStorage.getItem("authToken");

    const res = await request({
      axiosConfig: {
        method: "POST",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
          Authorization: `Bearer ${authToken}`,
        },
        url: `${ApiBase}/logout`,
      },
    });
    return res ?? null;
  },
};
