import { useEffect, useState } from "react";
import axios from "axios";
import crypto from "crypto";
import { getCurrentFormattedDate } from "@/Helper/currentDateAndTime";
import Container from "@/components/Layout/Container";
import Loading from "@/components/Utils/Loading";
import TourList from "@/components/Bokun/TourCardListItem";
import useDataFromBokun from "@/hooks/useDataFromBokun";

const BokunTest = () => {
    // const baseUrl = process.env.BOKUN_API_URL;
    // const secretKey = "eb5036832653412d93dd0feca6cbf788";

    const apiData = useDataFromBokun("/product-list.json/list?lang=EN");
    if (apiData) {
        // Check if apiData is available
        return (
            <Container>
                <h1 className="text-2xl font-semibold mb-4">Tour Listings</h1>

                <TourList tours={apiData} />
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
