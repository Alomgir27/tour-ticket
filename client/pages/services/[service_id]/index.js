// import servicesService from "@/App/Services/Service/servicesService";
import { ApiBase } from "@/Helper/ApiBase";
import CheckAvailabilityCard from "@/components/Details/CheckAvailabilityCard";
import HighlightList from "@/components/Details/HighlightList";
import ImportantInfoList from "@/components/Details/ImportantInfoList";
import PackageOptions from "@/components/Details/PackageOptions/PackageOptions";
import BlogContainer from "@/components/Index/BlogContainer";
import Container from "@/components/Layout/Container";
import CancelSvg from "@/components/Svg/CancelSvg";
import FavouriteSvg from "@/components/Svg/FavouriteSvg";
import RefreshLoopSvg from "@/components/Svg/RefreshLoopSvg";
import ReserveSvg from "@/components/Svg/ReserveSvg";
import SafeGuardSvg from "@/components/Svg/SafeGuardSvg";
import ShareSvg from "@/components/Svg/ShareSvg";
import BreadCrumb from "@/components/Utils/BreadCrumb";
import CategoryCard from "@/components/Utils/CategoryCard";
import CategoryTag from "@/components/Utils/CategoryTag";
import ExperianceCard from "@/components/Utils/ExperianceCard";
import IconList from "@/components/Utils/IconList";
import Loading from "@/components/Utils/Loading";
import OverviewCard from "@/components/Utils/OverviewCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";

const index = ({ serviceData }) => {
    console.log("serviceData", serviceData);

    // const {
    //     id,
    //     title,
    //     tags,
    //     discount,
    //     price,
    //     short_description,
    //     actual_price,
    //     images,
    //     activity_feature,
    //     what_includes,
    //     service_exp,
    //     service_overview,
    // } = props.service_details;
    const {
        id,
        internalName,
        reference,
        locale,
        timeZone,
        allowFreesale,
        freesaleDurationAmount,
        freesaleDurationUnit,
        instantConfirmation,
        instantDelivery,
        availabilityRequired,
        availabilityType,
        deliveryFormats,
        deliveryMethods,
        settlementMethods,
        redemptionMethod,
        options,
        title,
        country,
        location,
        subtitle,
        pointToPoint,
        shortDescription,
        inclusions,
        description,
        coverImageUrl,
        galleryImages,
        defaultCurrency,
        availableCurrencies,
        pricingPer,
    } = serviceData;
    

    // Now you have individual variables with the corresponding values from the object.

    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState( "/assets/details_default_cover.jpeg");

    const netPrice = serviceData?.options?.[0]?.units?.[0]?.pricingFrom?.[0].net;
    const retailPrice = serviceData?.options?.[0]?.units?.[0]?.pricingFrom?.[0].retail;
    const discount = Math.round(((retailPrice - netPrice) / retailPrice) * 100);

    // const { loading: loadingAnotherServices, data } = useSelector((state) => state.services);

    // OTHER SERVICES
    useEffect(() => {
        // servicesService.getList();
    }, []);

    // UPDATE IMAGE WHEN ROUTE CHANGES
    // useEffect(() => {
    //     if (images.length) {
    //         setSelectedImage(images[0]);
    //     } else {
    //         setSelectedImage({
    //             service_image: "/assets/404image.jpg",
    //         });
    //     }
    // }, [router.query.service_id]);

    // Prevents error when service_exp is empty
    // let services_exps = {};
    // if (service_exp.length) {
    //     services_exps = service_exp[0];
    // }

    // const serviceList = data?.data?.data; // WILL GOTO randomServicesList
    // pick random 4 services from serviceList within it's length
    const randomServices = (arr, n) => {
        if (!arr || n > arr.length) return arr;

        const shuffledArr = arr.slice();
        for (let i = shuffledArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
        }

        return shuffledArr.slice(0, n);
    };

    // const randomServicesList = randomServices(serviceList, 4);

    return (
        <div className=" flex flex-col gap-10 sm:gap-16 md:gap-32">
            <Container>
                <BreadCrumb />
                <div className="flex gap-6">
                    <div className="flex gap-6 flex-col-reverse lg:flex-row">
                        <div className="">
                            <div className="flex flex-col gap-6 my-8">
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-xl md:text-4xl font-extrabold capitalize leading-normal">
                                        {title}
                                    </h2>
                                    <div className="flex items-center justify-between">
                                        <div className="gap-2 lg:gap-6  inline-flex">
                                            <CategoryTag title={subtitle} bgColor={"bg-blue-100"} />
                                            {/* <CategoryTag title={"Green Line"} bgColor={"bg-green-400"} /> */}
                                        </div>
                                        <div className="gap-2 lg:gap-6 flex items-center font-base capitalize">
                                            <div className="items-center gap-2 flex cursor-pointer">
                                                <FavouriteSvg />
                                                <div className="">Save</div>
                                            </div>
                                            <div className=" items-center gap-2 flex cursor-pointer">
                                                <ShareSvg />
                                                <div className="">Share</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <div className=" object-cover h-full overflow-hidden rounded-lg">
                                        {/* Large Image */}

                                        <Image
                                            src={selectedImage}
                                            alt="_"
                                            width={600}
                                            height={400}
                                            className="w-full"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* TODO: Image thumbs for service details */}
                                        {galleryImages?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-lg "
                                                onClick={() => setSelectedImage(item.url)}
                                            >
                                                <Image
                                                    src={item.url}
                                                    alt="_"
                                                    width={600}
                                                    height={400}
                                                    className="w-[140px]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="">{shortDescription}</p>
                            </div>
                            <div className="my-8 flex flex-col gap-4">
                                {/* TODO: Overview Api theke pawa jaynai */}
                                <h2 className=" text-2xl font-bold capitalize">Overview</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <OverviewCard
                                        wFull
                                        icon={<CancelSvg />}
                                        backgroundColor={"bg-orange-50"}
                                        liteBg={"bg-red-200"}
                                        title={"Free cancellation"}
                                        subtitle={"Cancel up to 24 hours in advance for a full refund"}
                                    />
                                    <OverviewCard
                                        wFull
                                        icon={<ReserveSvg />}
                                        backgroundColor={"bg-blue-700/10"}
                                        liteBg={"bg-blue-700/20"}
                                        title={"Reserve now & pay later"}
                                        subtitle={
                                            "Keep your travel plans flexible — book your spot and pay nothing today."
                                        }
                                    />
                                    <OverviewCard
                                        wFull
                                        icon={<SafeGuardSvg />}
                                        backgroundColor={"bg-lime-500/10"}
                                        liteBg={"bg-lime-500/25"}
                                        title={"Audio guide included"}
                                        subtitle={"English, French, Spanish, Italian, German"}
                                    />
                                    <OverviewCard
                                        wFull
                                        icon={<RefreshLoopSvg />}
                                        backgroundColor={"bg-amber-400/10"}
                                        liteBg={"bg-amber-400/25"}
                                        title={"Skip the ticket line"}
                                    />
                                    <OverviewCard
                                        wFull
                                        icon={<SafeGuardSvg />}
                                        backgroundColor={"bg-lime-500/10"}
                                        liteBg={"bg-lime-500/25"}
                                        title={"Wheelchair accessible"}
                                        subtitle={"Yes"}
                                    />
                                    <OverviewCard
                                        wFull
                                        icon={<RefreshLoopSvg />}
                                        backgroundColor={"bg-amber-400/10"}
                                        liteBg={"bg-amber-400/25"}
                                        title={"Host or greeter"}
                                        subtitle={"English"}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 my-8" id="package_options">
                                <h2 className=" text-2xl font-bold capitalize">Package options</h2>
                                <PackageOptions options={options} />
                            </div>
                            <div className="flex flex-col gap-4 my-8">
                                <h2 className=" text-2xl font-bold capitalize">What’s Included</h2>
                                <div className="flex flex-col gap-4">
                                    {inclusions?.map((item, index) => (
                                        <IconList key={index} title={item} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4  my-8">
                                <h2 className=" text-2xl font-bold capitalize">Experience</h2>
                                <div className="p-2.5 bg-slate-100 rounded-2xl flex-col gap-2.5 inline-flex">
                                    <>
                                        <ExperianceCard title={"Full description"} description={description} />
                                        {/* TODO: highlights array from api */}
                                        <ExperianceCard title={"Highlights"} description={"highlights"} />
                                        <ExperianceCard
                                            title={"Important information"}
                                            description={"important_information"}
                                        />
                                    </>
                                </div>
                            </div>

                            {/* <div className="flex flex-col gap-4 my-8 ">
                                <h2 className=" text-2xl font-bold capitalize">Meeting point</h2>
                                <OverviewCard
                                    wFull
                                    icon={<SafeGuardSvg />}
                                    backgroundColor={"bg-lime-500/10"}
                                    liteBg={"bg-lime-500/25"}
                                    title={"Name Of Meeting Point"}
                                    subtitle={"Via Giuseppe Massara,22, 24123 Rome, Italia"}
                                />
                            </div> */}
                        </div>
                        <div className=" mt-10 lg:mt-[10.5rem] mx-auto">
                            <CheckAvailabilityCard price={retailPrice} actual_price={netPrice} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <h2 className=" text-2xl font-bold capitalize">You Can our another services</h2>
                    {/* TODO: ENABLE RANDOM SERVICE */}
                    {/* <div className="grid grid-cols-service-cards gap-5">
                        {loadingAnotherServices ? (
                            <Loading />
                        ) : (
                            randomServicesList?.map((item, index) => {
                                return (
                                    <CategoryCard
                                        key={index}
                                        link={`/services/${item?.id}`}
                                        img={item?.images}
                                        title={item?.title}
                                        price={item?.price}
                                        actual_price={item?.actual_price}
                                        discount={item?.discount}
                                        tags={item?.tags}
                                    />
                                );
                            })
                        )}
                    </div> */}
                </div>
            </Container>
            <BlogContainer
                title={"See Some Tour Blog"}
                subtitle={
                    "See our top discount guided tours. Colosseum, Vatican Museums, Pompeii, Capri and many others."
                }
            />
        </div>
    );
};

// export const getServerSideProps = async (context) => {
//     try {
//         const { service_id } = context.params;
//         const url = `${ApiBase}/services/${service_id}`;
//         const res = await fetch(url);
//         const data = await res.json();

//         return {
//             props: {
//                 service_details: data.data,
//             },
//         };
//     } catch (error) {
//         return null;
//     }
// };

export async function getServerSideProps(context) {
    // get id from query params
    const { service_id } = context.query;
    const url = `${process.env.VENTRATA_API}/products/${service_id}`;
    // Define your authorization token here
    const authToken = process.env.VENTRATA_AUTH_KEY;

    const headers = {
        Authorization: `Bearer ${authToken}`,
    };

    const res = await fetch(url, { headers });
    const data = await res.json();

    return {
        props: {
            serviceData: data,
        },
    };
}

export default index;
