import { ApiBase } from "../../../Helper/ApiBase";
import { request } from "../../../Service/ApiServices";

export const WhatIncldeRepository = {
  getList: async () => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/what-include`,
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
        url: `${ApiBase}/what-include`,
        data,
      },
    });
    return res ?? null;
  },
  single: async (id) => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/what-include/${id}`,
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
        url: `${ApiBase}/what-include/${id}`,
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
        url: `${ApiBase}/what-include/${id}`,
      },
    });
    return res ?? null;
  },
};
