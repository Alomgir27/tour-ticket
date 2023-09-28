import { getCurrentFormattedDate } from "@/Helper/currentDateAndTime";
import { useEffect } from "react";
import { useState } from "react";
import crypto from "crypto";
import axios from "axios";

const useDataFromBokun = (apiRoute) => {
    const [apiData, setApiData] = useState();
    const baseApiUrl = "https://api.bokun.io";
    const secretKey = "6d080ca030614d55bf0269b941058745";
    const httpMethod = "GET";
    const requestUrl = `${baseApiUrl}${apiRoute}`;
    const acceptHeader = "application/json";
    const accessKeyHeader = "3a1d7cae2eb0471b9fdf2438b7aa3b0a";
    const dateHeader = getCurrentFormattedDate();
    const stringToSign = `${dateHeader}${accessKeyHeader}${httpMethod}${apiRoute}`;
    const signature = crypto.createHmac("sha1", secretKey).update(stringToSign, "utf-8").digest("base64");
    const headers = {
        Accept: acceptHeader,
        "X-Bokun-AccessKey": accessKeyHeader,
        "X-Bokun-Date": dateHeader,
        "X-Bokun-Signature": signature,
    };

    useEffect(() => {
        axios
            .get(requestUrl, { headers })
            .then((response) => {
                // Handle the API response here
                setApiData(response.data);
            })
            .catch((error) => {
                // Handle errors here
                console.error(error);
            });
    }, []); // Empty dependency array ensures this effect runs only once (on component mount)

    return apiData ? apiData : null;
};

export default useDataFromBokun;
