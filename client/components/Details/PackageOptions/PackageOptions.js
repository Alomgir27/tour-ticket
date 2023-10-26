import { ApiAuth, ApiBase, Capabilities, ApiBaseMysql } from "@/Helper/ApiBase";
import { CancelRedSvg } from "@/components/Svg/CancelRedSvg";
import { CoutionSvg } from "@/components/Svg/CoutionSvg";
import { MapPointerSvg } from "@/components/Svg/MapPointerSvg";
import { ShoppingBag } from "@/components/Svg/ShoppingBag";
import { CalendarSvg } from "@/components/Svg/CalendarSvg";
import { ItemPlusSvg } from "@/components/Svg/ItemPlusSvg";
import { ItemCutSvg } from "@/components/Svg/ItemCutSvg";
import { useEffect, useState } from "react";
import SelectDateCard from "./SelectDateCard";
import { useRouter } from "next/router";
import { ProductsRepo } from "@/App/Repositories/Products/ProductsRepo";
import Calendar from "react-calendar";
import moment from "moment";
import axios from "axios";
import Loading from "@/components/Utils/Loading";

function PackageOptions({ options, isVentrata, item }) {
    const [availability, setAvailability] = useState([]);
    const [selectedItem, setSelectedItem] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { units } = options?.length > 0 ? options[0] : [];
    let router = useRouter();
    const [dateOptions, setDateOptions] = useState([]);
    const [showMoreDateStart, setShowMoreDateStart] = useState(false);
    const [localDateStart, setLocalDateStart] = useState(moment().format("YYYY-MM-DD"));
    const [selectAvailability, setSelectAvailability] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        title,
        activity_feature,
        actual_price,
        discount,
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
    } = item;



    useEffect(() => {
        setDateOptions([moment().format("YYYY-MM-DD"), moment().add(1, "days").format("YYYY-MM-DD"), moment().add(2, "days").format("YYYY-MM-DD"), moment().add(3, "days").format("YYYY-MM-DD")]);
    }, []);



    const handleAddItem = (item, price) => {
        const existingItem = selectedItem.find((x) => x.id === item.id);
        if (existingItem) {
            setSelectedItem(
                selectedItem.map((x) => {
                    if (x.id === item.id) {
                        return { ...x, quantity: x.quantity + 1 };
                    } else {
                        return x;
                    }
                })
            );
        } else {
            setSelectedItem([...selectedItem, item]);
        }

        setTotalPrice(totalPrice + price);
    };
    const handleRemoveItem = (item, price) => {
        const existingItem = selectedItem.find((x) => x.id === item.id);
        if (existingItem.quantity == 0) return;
        if (existingItem) {
            setSelectedItem(
                selectedItem.map((x) => {
                    if (x.id === item.id) {
                        return { ...x, quantity: x.quantity - 1 };
                    } else {
                        return x;
                    }
                })
            );
        } else {
            setSelectedItem([...selectedItem, item]);
        }

        setTotalPrice(totalPrice - price);
    };
    const packageData = async (firstDate, lastDate) => {
        setSelectAvailability(null);
        const productData = new FormData();
        productData.append("productId", router.query.service_id);
        productData.append("optionId", options?.length > 0 ? options[0].id : "DEFAULT");
        productData.append("localDateStart", firstDate);
        productData.append("localDateEnd", lastDate);
        productData.append("units", selectedItem);
        console.log(JSON.stringify(selectedItem));

        try {


            const packageData = await ProductsRepo.getPackageData(productData);
            setAvailability(packageData);
            console.log(packageData);
        } catch (error) {
            // Handle any errors that might occur during the asynchronous operation.
            console.error(error);
        }
    };

    useEffect(() => {
        packageData(moment().format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        !isVentrata && setSelectAvailability({ id: service_detail_package?.tour_date + "T" + service_detail_package?.opening_hours, status: "AVAILABLE" })

    }, [options]);




    const handleBookNow = async () => {
        if (!selectAvailability) return alert("Please select availability");
        const object = {
            productId: router.query.service_id,
            optionId: options?.length > 0 ? options[0].id : "DEFAULT",
            availabilityId: selectAvailability.id,
            notes: "Optional notes for the booking",
        };

        let unitItems = [];
        let info = []

        selectedItem.map((item) => {
            for (let i = 0; i < item.quantity; i++) {
                unitItems.push({ unitId: item.id });
            }
        });

        //if not ventrata
        if (!isVentrata) {
            if (!router.query.service_id) return alert("Please select quantity");
            if (!selectedItem || !selectedItem.find((x) => x.id === router.query.service_id) || selectedItem.find((x) => x.id === router.query.service_id)?.quantity == 0) return alert("Please select quantity");
            unitItems.push({ unitId: router.query.service_id });
            object.availabilityId = service_detail_package?.tour_date + "T" + service_detail_package?.opening_hours;
            object.optionId = "DEFAULT";
            object.productId = router.query.service_id;
            let info = [];
            info.push({
                quantity: selectedItem.find((x) => x.id === router.query.service_id).quantity,
                type: "Adult",
                price: price,
            })
            object.unitItems = unitItems;
            object.info = info;
            object.totalPrice = totalPrice;
            object.bookingId = "DEFAULT";
            object.discount = discount;
            router.push({
                pathname: "/checkout",
                query: {
                    data: JSON.stringify(object),
                },
            });
            return;

        }

        selectedItem.map((item) => {
            info.push({
                quantity: item.quantity,
                type: units.find((x) => x.id === item.id).internalName,
                price: units.find((x) => x.id === item.id).pricingFrom[0].net,
            })
        });


        object.unitItems = unitItems;

        if (!object.unitItems.length) return alert("Please select quantity");

        setLoading(true);


        try {
            const res = await axios.post(`${ApiBase}/bookings`, object, {
                headers: {
                    "Content-Type": "application/json",
                    'Octo-Capabilities': Capabilities,
                    Authorization: `Bearer ${ApiAuth}`,
                },
            });
            // console.log(res);
            setLoading(false);
            object.bookingId = res.data.id;
            object.info = info;
            object.totalPrice = totalPrice;

            router.push({
                pathname: "/checkout",
                query: {
                    data: JSON.stringify(object),
                },
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };




    // if (loading) return (<Loading />);




    return (
        <div className="w-full h-fit p-2.5 bg-slate-100 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-full p-5 bg-white rounded-lg flex-col justify-start items-start gap-5 flex">
                <div className="h-[15px]  text-lg font-bold leading-none">Finding availability...</div>

                <span className="text-sm font-normal leading-snug">
                    <span className="text-red-500 font-semibold leading-none">Note:</span> You can book this ticket and collects from the meeting point. This Ticket is not
                    available on Online website.
                </span>

                <hr className="w-full border border-zinc-100" />


                {isVentrata && (
                    <div className="w-full flex flex-col justify-start items-start gap-5">
                        <div className="justify-start items-center gap-2.5 flex flex-wrap">
                            {dateOptions?.map((date, index) => (
                                <SelectDateCard key={index}
                                    onClick={() => {
                                        setLocalDateStart(date);
                                        packageData(date, date);
                                    }}
                                    title={date == moment().format("YYYY-MM-DD") ? "Today" : moment(date).format("dddd")}
                                    active={localDateStart == date ? true : false}
                                />
                            ))}
                            {showMoreDateStart && (
                                <Calendar
                                    className="w-full"
                                    onChange={(date) => {
                                        setLocalDateStart(moment(date).format("YYYY-MM-DD"));
                                        packageData(moment(date).format("YYYY-MM-DD"), moment(date).format("YYYY-MM-DD"));
                                    }}
                                    maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                                    minDate={new Date()}
                                />
                            )}
                            <div className="px-5 py-[9px] bg-white rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex">
                                <CalendarSvg />
                                <button className="text-center capitalize leading-none font-semibold cursor-pointer" onClick={() => setShowMoreDateStart(!showMoreDateStart)}>
                                    {showMoreDateStart ? "Hide" : "More Dates"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                <hr className="w-full border border-zinc-100" />
                {!isVentrata && (
                    <div className="w-full flex flex-col justify-start items-start gap-5">
                        <div className="justify-start items-center gap-2.5 flex flex-wrap">
                            <div className="px-5 py-[9px] bg-white rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex">
                                <CalendarSvg />
                                <p className="text-center capitalize leading-none font-semibold cursor-pointer">
                                    {moment(service_detail_package?.tour_date).format("dddd, MMMM Do YYYY")}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="w-full py-6 flex flex-col border-t border-b border-zinc-100 justify-start items-start gap-6 bg-white rounded-lg p-5">
                <div className="flex flex-col justify-start items-start gap-5">
                    <div className="  text-lg font-semibold leading-none">Select Time Slot</div>
                    <div className="justify-start items-start gap-2.5 flex flex-wrap">
                        {isVentrata && availability?.map((date, index) => {
                            return (
                                <div key={index} className={`px-5 py-[9px] rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex ${date.id == selectAvailability?.id ? "bg-green-300" : ""} cursor-pointer
                            ${date.status == "AVAILABLE" || date.status == "FREESALE" || date.status == "LIMITED" ? "bg-green-100" : "bg-red-100"}`}
                                    onClick={() => setSelectAvailability({ id: date.id, status: date.status })}>
                                    {moment(date.id).format("hh:mm A")}
                                </div>
                            )
                        })}

                        {!isVentrata && (
                            <div className={`px-5 py-[9px] rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex cursor-pointer
                            bg-green-100`}>
                                {moment(service_detail_package?.tour_date + " " + service_detail_package?.opening_hours).format("hh:mm A")}
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* {availability && (
                <div className="w-full p-5 bg-white rounded-lg flex-col justify-start items-start gap-5 flex">
                    <p className="text-lg font-semibold leading-none">Availability for {moment(localDateStart).format("dddd, MMMM Do YYYY")} - {moment(localDateEnd).format("dddd, MMMM Do YYYY")}</p>
                    <span className="text-sm font-normal leading-snug">Results are shown in your local time zone ({moment().format("Z")}) &nbsp; total of {availability.length} days</span>
                    {availability.map((date, index) => (
                        <div key={index} className={`w-full flex flex-col justify-start items-start gap-5 border border-zinc-100 rounded-lg p-5 ${date == selectAvailability ? "bg-green-300" : ""} cursor-pointer 
                          ${date.status == "AVAILABLE" || date.status == "FREESALE" || date.status == "LIMITED" ? "bg-green-100" : "bg-red-100"}`}
                            onClick={() => setSelectAvailability(date)}>
                            <div className="text-sm font-semibold leading-none">{moment(date.id).format("dddd, MMMM Do YYYY")} ({date.openingHours.length} slots)</div>
                            <div className="justify-start items-start gap-2.5 flex flex-wrap">
                                {date.openingHours.map((time, index) => (
                                    <span key={index} className="px-5 py-[9px] bg-white rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex">
                                        {moment(time.from, "HH:mm").format("hh:mm A")} - {moment(time.to, "HH:mm").format("hh:mm A")}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 font-normal leading-snug">Last booking time: {moment(date.utcCutoffAt).format("hh:mm A")}</p>
                            <span className="text-sm text-gray-500 font-normal leading-snug">Note: {date.status}</span>
                        </div>
                    ))}
                </div>
            )} */}



            <div className="w-full p-5 bg-white rounded-lg flex-col justify-start items-start gap-5 flex">
                <div className="w-full py-6 flex flex-col border-t border-b border-zinc-100 justify-start items-start gap-6 ">
                    <div className="flex flex-col justify-start items-start gap-5">
                        <div className="text-lg font-semibold leading-none">Select quantity</div>
                        <div className="  flex flex-col justify-start items-start gap-6 ">
                            {isVentrata && units?.map((unit, index) => (
                                <div key={index} className="w-full space-between items-center flex gap-2 md:gap-6">
                                    <div className=" font-semibold leading-relaxed mr-9">{unit.internalName}</div>
                                    <div className="justify-between items-center gap-2 md:gap-6 flex">
                                        <div className=" font-semibold leading-relaxed">{`${unit.pricingFrom[0].currency} $${unit.pricingFrom[0].retail}`}</div>
                                        <div className="justify-between items-center gap-3 flex">

                                            <div
                                                onClick={() =>
                                                    handleRemoveItem(
                                                        {
                                                            id: unit.id,
                                                            quantity: 0,
                                                        },
                                                        unit.pricingFrom[0].retail
                                                    )
                                                }
                                            >
                                                <ItemCutSvg />
                                            </div>
                                            <div className="text-center">
                                                {selectedItem.find((x) => x.id === unit.id)
                                                    ?.quantity ?? 0}
                                            </div>
                                            <div
                                                onClick={() =>
                                                    handleAddItem(
                                                        {
                                                            id: unit.id,
                                                            quantity: 1,
                                                        },
                                                        unit.pricingFrom[0].retail
                                                    )
                                                }
                                            >
                                                <ItemPlusSvg />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {!isVentrata && (
                                <div className="w-full space-between items-center flex gap-2 md:gap}-6">
                                    <div className="flex flex-col font-semibold leading-relaxed">
                                        Adult
                                    </div>
                                    <div className="justify-between items-center gap-2 md:gap-6 flex">
                                        <div className=" font-semibold leading-relaxed">US$ {price}</div>
                                        <p className="text-sm text-gray-500 font-normal leading-snug">{discount} % off</p>
                                        <div className="justify-between items-center gap-3 flex">
                                            <button className="p-[7px] rounded-[30px] justify-center items-center flex cursor-pointer" onClick={() => {
                                                if (totalPrice == 0) return;
                                                setTotalPrice(totalPrice - parseInt(price) + parseFloat(price * discount / 100));
                                                setSelectedItem(
                                                    selectedItem.map((x) => {
                                                        if (x.id === router.query.service_id) {
                                                            return { ...x, quantity: x.quantity - 1 };
                                                        } else {
                                                            return x;
                                                        }
                                                    }
                                                    )
                                                )

                                            }}>
                                                <ItemCutSvg />
                                            </button>
                                            <div className="text-center">
                                                {selectedItem.find((x) => x.id === router.query.service_id)
                                                    ?.quantity ?? 0}
                                            </div>
                                            <button className=" p-[7px]  rounded-[30px] justify-center items-center flex cursor-pointer" onClick={() => {
                                                setTotalPrice(totalPrice + parseInt(price) - parseFloat(price * discount / 100));
                                                let existingItem = selectedItem.find((x) => x.id === router.query.service_id);
                                                if (!existingItem) {
                                                    setSelectedItem([...selectedItem, { id: router.query.service_id, quantity: 1 }]);
                                                    return;
                                                }
                                                setSelectedItem(
                                                    selectedItem.map((x) => {
                                                        if (x.id === router.query.service_id) {
                                                            return { ...x, quantity: x.quantity + 1 };
                                                        } else {
                                                            return x;
                                                        }
                                                    }
                                                    )
                                                )
                                            }}>
                                                <ItemPlusSvg />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div className="w-full p-5 bg-white rounded-lg flex-col justify-start items-start gap-5 flex">
                    <button className="w-full h-11 px-5 py-4 bg-red-500 rounded-lg border border-red-500 justify-center items-center gap-2.5 flex text-white font-bold leading-none" onClick={() => packageData(localDateStart, localDateStart)}>
                        Check Availability
                    </button>
                </div> */}
                <div className="self-stretch justify-between items-center gap-2.5 flex flex-wrap gap-y-8">
                    <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                        <div className="justify-start items-center gap-[13px] inline-flex">
                            <div className=" font-bold capitalize">Form</div>
                            <div className="text-red-500 text-2xl font-extrabold capitalize">US$ {totalPrice}</div>
                        </div>
                        <div className="opacity-70  text-sm capitalize">Complete all required fields continue</div>
                    </div>
                    <div className="justify-start items-start gap-6 flex">
                        {loading ? (
                            <div className="w-10 h-10 p-[7px] bg-red-200 rounded-[30px] justify-center items-center flex">
                                <Loading />
                            </div>
                        )
                            :
                            (
                                <button className="h-11 px-5 py-4 bg-red-500 rounded-lg border border-red-500 justify-center items-center gap-2.5 flex text-white font-bold leading-none cursor-pointer"
                                    onClick={handleBookNow} disabled={loading}>
                                    Book now
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageOptions;
