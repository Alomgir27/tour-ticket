import { ApiBase } from "../../../Helper/ApiBase";
import { request } from "../../../Service/ApiServices";

export const serviceRepository = {
  getList: async () => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/services`,
      },
    });
    return res ?? null;
  },
  getSingle: async (id) => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/services/${id}`,
      },
    });
    return res ?? null;
  },
  createService: async (data) => {
    const res = await request({
      axiosConfig: {
        method: "POST",
        headers: {
          Accept: `application/json`,
          "Content-Type": `multipart/form-data`,
          "Process-Data": false,
        },
        url: `${ApiBase}/services`,
        data: data,
      },
    });
    return res ?? null;
  },
};
