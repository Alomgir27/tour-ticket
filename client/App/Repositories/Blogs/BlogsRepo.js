import { ApiAuth, ApiBase, Capabilities, ApiBaseMysql } from "@/Helper/ApiBase";
import { request } from "@/Service/ApiServices";

export const BlogsRepo = {
    getBlogs: async () => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBaseMysql}/blog`,
            },
        });
        return res;
    },
    getBlogById: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBaseMysql}/blog/${id}`,
            },
        });
        return res;
    },
    getBlogBySlug: async (slug) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBaseMysql}/blog/slug/${slug}`,
            },
        });
        return res;
    },
    getBlogByCategoryId: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBaseMysql}/blog/category/${id}`,
            },
        });
        return res;
    },
    getBlogByTagId: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBaseMysql}/blog/tag/${id}`,
            },
        });
        return res;
    },
    getBlogByAuthorId: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBaseMysql}/blog/author/${id}`,
            },
        });
        return res;
    }
}

