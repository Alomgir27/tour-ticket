import {  ApiBaseMysql } from "@/Helper/ApiBase";
import { request } from "@/Service/ApiServices";    
import axios from "axios";

export const AuthRepo = {
    login: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/login`,
                data: data,
            },
        });
        return res;
    },
    register: async (data) => {
        console.log(data);
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/register`,
                data: data,
            },
        });
        return res;
    },
    logout: async () => {
        const res = await request({
            axiosConfig: {
                method: "GET",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/logout`,
            },
        });
        return res;
    },
    forgotPassword: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/forgot-password`,
                data: data,
            },
        });
        return res;
    },
    resetPassword: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/reset-password`,
                data: data,
            },
        });
        return res;
    },
    updateProfile: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/update-profile`,
                data: data,
            },
        });
        return res;
    },
    updatePassword: async (data) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/update-password`,
                data: data,
            },
        });
        return res;
    },
    isUserExist: async (email) => {
        const res = await request({
            axiosConfig: {
                method: "POST",
                headers: {
                    Accept: `application/json`,
                    "Content-Type": `application/json`,
                },
                url: `${ApiBaseMysql}/is-user-exist`,
                data: {
                    email: email,
                },
            },
        });
        return res;
    }
};
