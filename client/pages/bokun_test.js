import { useEffect, useState } from "react";
import axios from "axios";
import crypto from "crypto";
import { getCurrentFormattedDate } from "@/Helper/currentDateAndTime";
import Container from "@/components/Layout/Container";
import Loading from "@/components/Utils/Loading";

const BokunTest = () => {
    // const baseUrl = process.env.BOKUN_API_URL;
    // const secretKey = "eb5036832653412d93dd0feca6cbf788";
    const secretKey = "6d080ca030614d55bf0269b941058745";
    const httpMethod = "GET";
    const requestUrl = "https://api.bokun.io/product-list.json/list?lang=EN";
    const acceptHeader = "application/json";
    // const accessKeyHeader = "a8385128928b4760ba107b9e42fb2ab6";
    const accessKeyHeader = "3a1d7cae2eb0471b9fdf2438b7aa3b0a";
    const dateHeader = getCurrentFormattedDate();

    const stringToSign = `${dateHeader}${accessKeyHeader}${httpMethod}${"/product-list.json/list?lang=EN"}`;
    const signature = crypto.createHmac("sha1", secretKey).update(stringToSign, "utf-8").digest("base64");

    const headers = {
        Accept: acceptHeader,
        "X-Bokun-AccessKey": accessKeyHeader,
        "X-Bokun-Date": dateHeader,
        "X-Bokun-Signature": signature,
    };

    const [apiData, setApiData] = useState();

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
    console.log(apiData);
    if (apiData) {
        // Check if apiData is available
        const { id, title, description, slug, flags, children, keyPhoto, photos, items } = apiData;
        return (
            <Container>
                <div className="max-w-xs rounded overflow-hidden shadow-lg">
                    <img src={keyPhoto.originalUrl} alt={keyPhoto.description} className="w-full" />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{title}</div>
                        <p className="text-gray-700 text-base">{description.replace(/<\/?p>/g, "")}</p>
                    </div>
                    <div className="px-6 py-4">
                        {flags.map((flag, index) => (
                            <span
                                key={index}
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                            >
                                {flag}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        );
    } else {
        return (
            <Container>
                <Loading />
            </Container>
        );
    }
};

export default BokunTest;
