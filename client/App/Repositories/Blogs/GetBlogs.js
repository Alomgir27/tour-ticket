import axios from "axios";
import { ApiBaseMysql } from "@/Helper/ApiBase";


const fetchBlogs = async ({ search }) => {
  try {
    const params = {
      search
    };
    const response = await axios.get(`${ApiBaseMysql}/blog/top-blogs`, { params });
    return response.data;
  } catch (error) {
    return error;
  }
};



export { fetchBlogs };

