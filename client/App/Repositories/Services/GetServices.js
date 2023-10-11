// useGetServices.js
import axios from "axios";
import { ApiBaseMysql, ApiBase, ApiAuth, Capabilities } from "@/Helper/ApiBase";


const fetchData = async ({ search, category, startDate, endDate, sort, startHour, endHour, lowerPrice, higherPrice, page }) => {
  try {
    const params = {
      search,
      category,
      startDate,
      endDate,
      sort,
      startHour,
      endHour,
      lowerPrice,
      higherPrice,
      page,
    };
    const response = await axios.get(`${ApiBaseMysql}/services`, { params });
    return response.data;
  } catch (error) {
    return error;
  }
};


const fetchVendraData = async ({ destinationId, categoryId }) => {
  try {
    const params = {
      destinationId,
      categoryId,
    };
    const response = await axios.get(`${ApiBase}/products`, {
      params,
      headers: {
        Authorization: `Bearer ${ApiAuth}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Octo-Capabilities": Capabilities,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export { fetchData, fetchVendraData };

