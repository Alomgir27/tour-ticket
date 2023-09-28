import { ApiBase } from "../../../Helper/ApiBase";
import { request } from "../../../Service/ApiServices";

export const OverviewRepository = {
  getList: async () => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/overview`,
      },
    });
    return res ?? null;
  },
  create: async (data) => {
    const res = await request({
      axiosConfig: {
        method: "POST",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/overview`,
        data,
      },
    });
    return res ?? null;
  },
  singleOverview: async (id) => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/overview/${id}`,
      },
    });
    return res ?? null;
  },
  update: async (data, id) => {
    const res = await request({
      axiosConfig: {
        method: "PATCH",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/overview/${id}`,
        data,
      },
    });
    return res ?? null;
  },
  delete: async (id) => {
    const res = await request({
      axiosConfig: {
        method: "DELETE",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/overview/${id}`,
      },
    });
    return res ?? null;
  },
};
