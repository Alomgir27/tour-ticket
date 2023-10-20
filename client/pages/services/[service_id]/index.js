// import servicesService from "@/App/Services/Service/servicesService";
import {
    ApiBase,
    ApiAuth,
    Capabilities,
    ApiBaseMysql
} from "@/Helper/ApiBase";
import { ProductsService } from "@/App/Services/Products/ProductsService";
import { BlogsService } from "@/App/Services/Blogs/BlogsService";
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
import LocalProductCard from "@/components/Utils/LocalProductCard";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NextImage from "@/components/Utils/NextImage";
import "react-calendar/dist/Calendar.css";

const index = ({ serviceData, isVentrata }) => {
    console.log("serviceData", serviceData);


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
        options,
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

        title,
        activity_feature,
        actual_price,
        category,
        detail_images,
        images,
        price,
        service_detail_package,
        service_exp,
        service_overview,
        short_description,
        tags,
        what_includes
    } = serviceData;


    // Now you have individual variables with the corresponding values from the object.

    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);

    const netPrice = serviceData?.options?.[0]?.units?.[0]?.pricingFrom?.[0].net;
    const retailPrice = serviceData?.options?.[0]?.units?.[0]?.pricingFrom?.[0].retail;
    const discount = isVentrata ? Math.round(((retailPrice - netPrice) / retailPrice) * 100) : parseFloat(serviceData?.discount);

    const { products } = useSelector((state) => state.products);
    const { localProducts } = useSelector((state) => state.products);


    // OTHER SERVICES
    useEffect(() => {
        (async () => {
            if (products?.length > 0 || localProducts?.length > 0) return;
            await ProductsService.getInit();
            await BlogsService.getInit();
        }
        )();
    }, []);

    // UPDATE IMAGE WHEN ROUTE CHANGES
    useEffect(() => {
        if (router.query.service_id) {
            if (isVentrata) {
                setSelectedImage(coverImageUrl);
            }

        }
    }, [router.query.service_id]);

    // Prevents error when service_exp is empty
    // let services_exps = {};
    // if (service_exp.length) {
    //     services_exps = service_exp[0];
    // }



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
                                            <CategoryTag title={isVentrata ? subtitle : tags} bgColor={"bg-red-500"} />
                                            <CategoryTag title={isVentrata ? "Ventrata" : category}
                                                bgColor={"bg-green-400"} />
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

                                        {isVentrata ? (
                                            <Image
                                                src={selectedImage ? selectedImage : "/assets/details_default_cover.jpeg"}
                                                alt="_"
                                                width={600}
                                                height={400}
                                                className="w-full"
                                            />
                                        ) : (
                                            <NextImage
                                                src={selectedImage ? selectedImage : images}
                                                alt="_"
                                                width={600}
                                                height={400}
                                                className="w-full"
                                            />
                                        )}
                                        {console.log("selectedImage", selectedImage)}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* TODO: Image thumbs for service details */}
                                        {isVentrata ? galleryImages?.map((item, index) => (
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
                                        )) : detail_images?.map((item, index) => (
                                            <div
                                                key={index}
                                                className="overflow-hidden rounded-lg "
                                                onClick={() => setSelectedImage(item?.service_image)}
                                            >
                                                <NextImage
                                                    src={item?.service_image}
                                                    alt="_"
                                                    width={600}
                                                    height={400}
                                                    className="w-[140px]"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <p className="">{isVentrata ? shortDescription : short_description}</p>
                            </div>
                            <div className="my-8 flex flex-col gap-4">
                                {/* TODO: Overview Api theke pawa jaynai */}
                                <h2 className=" text-2xl font-bold capitalize">Overview</h2>
                                <div className="flex flex-col gap-4">
                                    {!isVentrata &&
                                        <OverviewCard
                                            key={index}
                                            wFull
                                            icon={<SafeGuardSvg />}
                                            backgroundColor={"bg-orange-50"}
                                            liteBg={"bg-red-200"}
                                            title={service_overview.service_overviews}
                                            subtitle={tags}
                                        />
                                    }
                                </div>
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
                                <PackageOptions options={options} isVentrata={isVentrata} item={serviceData} />
                            </div>
                            <div className="flex flex-col gap-4 my-8">
                                <h2 className=" text-2xl font-bold capitalize">What’s Included</h2>
                                <div className="flex flex-col gap-4">
                                    {isVentrata && inclusions?.map((item, index) => (
                                        <IconList key={index} title={item} />
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4  my-8">
                                <h2 className=" text-2xl font-bold capitalize">Experience</h2>
                                <div className="p-2.5 bg-slate-100 rounded-2xl flex-col gap-2.5 inline-flex">
                                    <>
                                        <ExperianceCard title={"ticket_details"} description={isVentrata ? description : service_detail_package?.ticket_details} />
                                        {!isVentrata && service_exp?.map((item, index) => (
                                            <div key={index} className="flex flex-col gap-4 my-8 mx-4">
                                                <p className="text-xl font-bold capitalize">{item?.highlights}</p>
                                                <p className="">{item?.full_description}</p>
                                                <p className="">{item?.important_information}</p>
                                            </div>
                                        ))}
                                    </>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 my-8 ">
                                <h2 className=" text-2xl font-bold capitalize">Meeting point</h2>
                                <OverviewCard
                                    wFull
                                    icon={<SafeGuardSvg />}
                                    backgroundColor={"bg-lime-500/10"}
                                    liteBg={"bg-lime-500/25"}
                                    title={"Name Of Meeting Point"}
                                    subtitle={"Via Giuseppe Massara,22, 24123 Rome, Italia"}
                                />
                            </div>
                        </div>
                        <div className=" mt-10 lg:mt-[10.5rem] mx-auto">
                            <CheckAvailabilityCard
                                price={isVentrata ? retailPrice : price}
                                actual_price={isVentrata ? netPrice : actual_price}
                                discount={discount}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <h2 className=" text-2xl font-bold capitalize">You Can our another services</h2>
                    {/* TODO: ENABLE RANDOM SERVICE */}
                    <div className="grid grid-cols-4 gap-6 max-xs:grid-cols-1 max-xs:gap-4 grid-cols-service-cards">
                        {products?.slice(0, 4).map((item, index) => {
                            const netPrice = item?.options?.[0]?.units?.[0]?.pricingFrom?.[0].net;
                            const retailPrice = item?.options?.[0]?.units?.[0]?.pricingFrom?.[0].retail;
                            const discount = Math.round(((retailPrice - netPrice) / retailPrice) * 100);

                            return (
                                <CategoryCard
                                    key={item.internalName}
                                    link={`/services/${item?.id}`}
                                    img={item?.coverImageUrl ? item?.coverImageUrl : item?.bannerImageUrl ? item?.bannerImageUrl : item?.galleryImages?.[0]?.url ?? ""}
                                    title={item?.title}
                                    price={retailPrice}
                                    actual_price={netPrice}
                                    discount={Math.abs(discount)}
                                    tags={item?.subtitle}
                                />
                            );
                        })}
                        {localProducts?.slice(0, 4).map((item, index) => (
                            <LocalProductCard key={index} item={item} />
                        ))}
                    </div>
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
    let url2 = `${process.env.VENTRATA_API}/products/${service_id}`;
    let url = `${ApiBaseMysql}/services/${service_id}`;

    //if service_id is a uuid then use Ventrata API
    // else use our own API
    if (service_id.length > 20) {
        url = url2;
    }

    // Define your authorization token here
    const authToken = process.env.VENTRATA_AUTH_KEY;

    const headers = {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        "Octo-Capabilities": Capabilities,

    };

    const res = await fetch(url, { headers });
    const data = await res.json();



    return {
        props: {
            serviceData: service_id.length > 20 ? data : data.data,
            isVentrata: service_id.length > 20,
        },
    };
}

export default index;
