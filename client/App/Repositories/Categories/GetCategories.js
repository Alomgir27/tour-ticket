import { useState, useEffect } from "react";
import { ApiAuth, ApiBase, Capabilities } from "@/Helper/ApiBase";
import axios from "axios";

export const useGetCategories = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchCategories = async () => {

      try {
        const response = await axios.get(`${ApiBase}/suppliers`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${ApiAuth}`,
            "Octo-Capabilities": Capabilities,
          },
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      }

    };

    fetchCategories();
  }, []);

  return { data };
};


