import { useState, useEffect } from "react";
import { ApiAuth, ApiBase, Capabilities, ApiBaseMysql } from "@/Helper/ApiBase";
import axios from "axios";

export const useGetCategories = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      setIsError(false);
      setIsLoading(true);

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
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchCategories();
  }, []);

  return { data, isLoading, isError };
};


