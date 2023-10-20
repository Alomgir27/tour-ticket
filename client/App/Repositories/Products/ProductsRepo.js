import { ApiAuth, ApiBase, Capabilities, ApiBaseMysql } from "@/Helper/ApiBase";
import { request } from "@/Service/ApiServices";

export const ProductsRepo = {
    getList: async () => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/products`,
            },
        });
        return res;
    },
    getPackageData: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/availability`,
                data: data,
            },
        });
        return res;
    },
    bookNow: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/bookings`,
                data: data,
            },
        });
        return res;
    },
    getCategoryInfo: async () => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/suppliers`,
            },
        });
        return res;
    },
    getAllProductsByCategoryId: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/products?categoryId=${id}`,
            },
        });
        return res;
    },
    getAllProductsByDestinationId: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/products?destinationId=${id}`,
            },
        });
        return res;
    },
    getLocalProducts: async () => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/services`,
            },
        });
        return res;
    },
    getLocalProductById: async (id) => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/services/${id}`,
            },
        });
        return res;
    }

};
