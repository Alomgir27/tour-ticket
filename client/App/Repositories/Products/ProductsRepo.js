import { ApiAuth, ApiBase } from "@/Helper/ApiBase";
import { request } from "@/Service/ApiServices";

export const ProductsRepo = {
    getList: async () => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
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
                    Authorization: `Bearer ${ApiAuth}`,
                },
                url: `${ApiBase}/availability`,
                data: data,
            },
        });
        return res;
    },
};
