import React, { useState, useEffect } from "react";
import { ApiAuth, ApiBase, Capabilities, ApiBaseMysql } from "@/Helper/ApiBase";
import axios from "axios";


export const useGetServices = (page, destinationId, categoryId) => {
  const [venTraTaProducts, setVenTraTaProducts] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");

  // console.log("useGetServices", page, destinationId, categoryId);

 
  useEffect(() => {
    const fetchVenTraTaProducts = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios.get(`${ApiBase}/products?categoryId=${categoryId || ""}&destinationId=${destinationId || ""}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${ApiAuth}`,
            "Octo-Capabilities": Capabilities,
          },
        });
        setVenTraTaProducts(response.data);
        console.log(response.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchVenTraTaProducts();
  }, [categoryId, destinationId]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await axios.get(`${ApiBaseMysql}/services?page=${page}&search=${search}&category=${category}&sort=${sort}&price=${price}&tags=${tags}&date=${date}&duration=${duration}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }
  , [page, search, category, sort, price, tags, date, duration]);

  return { data, isLoading, isError, venTraTaProducts };

};
