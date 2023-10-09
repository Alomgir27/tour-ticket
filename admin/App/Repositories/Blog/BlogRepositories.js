import { ApiBase } from "../../../Helper/ApiBase";
import { request } from "../../../Service/ApiServices";

export const BlogRepository = {
  getList: async () => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/blog`,
      },
    });
    return res ?? null;
  },
  create: async (data) => {
    console.log(data, data.get("is_top_blog"));
    const res = await request({
      axiosConfig: {
        method: "POST",
        headers: {
          Accept: `application/json`,
          "Content-Type": `multipart/form-data`,
          "Process-Data": false,

        },
        url: `${ApiBase}/blog`,
        data,
      },
    });
    return res ?? null;
  },
  singleBlog: async (id) => {
    const res = await request({
      axiosConfig: {
        method: "GET",
        headers: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
        url: `${ApiBase}/blog/${id}`,
      },
    });
    return res ?? null;
  },
  update: async (id, data) => {
    const res = await request({
      axiosConfig: {
        method: "POST",
        headers: {
          Accept: `application/json`,
          "Content-Type": `multipart/form-data`,
          "Process-Data": false,
        },
        url: `${ApiBase}/blog/${id}`,
        data: data,
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
        url: `${ApiBase}/blog/${id}`,
      },
    });
    return res ?? null;
  },
};
