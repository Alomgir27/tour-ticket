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

function PackageOptions({ options }) {
    const [availability, setAvailability] = useState([]);
    const [selectedItem, setSelectedItem] = useState([{}]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [activeDate, setActiveDate] = useState("today");
    const { units } = options?.length > 0 ? options[0] : [];
    let router = useRouter();
    const date = new Date();
    const today = date.toISOString().slice(0, 10);
    const tomorrow = new Date(date.setDate(date.getDate() + 1)).toISOString().slice(0, 10);
    const afterTomorrow = new Date(date.setDate(date.getDate() + 1)).toISOString().slice(0, 10);
    const afterAfterTomorrow = new Date(date.setDate(date.getDate() + 1)).toISOString().slice(0, 10);

    const handleAddItem = (item, price) => {
        const existingItem = selectedItem.find((x) => x.internalName === item.internalName);
        if (existingItem) {
            setSelectedItem(
                selectedItem.map((x) => {
                    if (x.internalName === item.internalName) {
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
        const existingItem = selectedItem.find((x) => x.internalName === item.internalName);
        if (existingItem) {
            setSelectedItem(
                selectedItem.map((x) => {
                    if (x.internalName === item.internalName) {
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
    console.log(selectedItem);
    console.log(totalPrice);
    const packageData = async (firstDate, lastDate) => {
        const productData = new FormData();
        productData.append("productId", router.query.service_id);
        productData.append("optionId", options?.length > 0 ? options[0].id : "DEFAULT");
        productData.append("localDateStart", firstDate);
        productData.append("localDateEnd", lastDate);

        try {
            const packageData = await ProductsRepo.getPackageData(productData);
            setAvailability(packageData);
            return packageData;
        } catch (error) {
            // Handle any errors that might occur during the asynchronous operation.
            console.error(error);
            throw error; // Re-throw the error if needed.
        }
    };

    useEffect(() => {
        packageData(today, today);
    }, [router]);
    return (
        <div className="w-full h-fit p-2.5 bg-slate-100 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
            <div className="w-full p-5 bg-white rounded-lg flex-col justify-start items-start gap-5 flex">
                <div className="h-[15px]  text-lg font-bold leading-none">Select Date</div>
                <div className="justify-start items-center gap-2.5 flex flex-wrap">
                    <SelectDateCard
                        onClick={() => {
                            setActiveDate("today");
                            packageData(today, today);
                        }}
                        title={"Today"}
                        active={activeDate == "today"}
                    />
                    <SelectDateCard
                        onClick={() => {
                            setActiveDate("tomorrow");
                            packageData(tomorrow, tomorrow);
                        }}
                        title={"Tomorrow"}
                        active={activeDate == "tomorrow"}
                    />
                    <SelectDateCard
                        onClick={() => {
                            setActiveDate(afterTomorrow);
                            packageData(afterTomorrow, afterTomorrow);
                        }}
                        title={afterTomorrow}
                        active={activeDate == afterTomorrow}
                    />
                    <SelectDateCard
                        onClick={() => {
                            setActiveDate(afterAfterTomorrow);
                            packageData(afterAfterTomorrow, afterAfterTomorrow);
                        }}
                        title={afterAfterTomorrow}
                        active={activeDate == afterAfterTomorrow}
                    />
                    <Calendar />
                    <div className="px-5 py-[9px] bg-white rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex">
                        <CalendarSvg />
                        <p className="text-center capitalize leading-none">More Date</p>
                    </div>
                </div>
            </div>
            {availability && availability[0]?.available && (
                <div className="p-5 w-full bg-white rounded-lg flex-col justify-end items-start gap-6 flex">
                    <div className=" flex-col justify-start items-start gap-6 flex">
                        <div className="flex-col justify-start items-start gap-5 flex">
                            <div className="text-lg font-bold leading-none">Package Type</div>
                            <div className="justify-start items-start gap-2.5 flex flex-wrap w-fit">
                                {options.map((option, index) => (
                                    <SelectDateCard
                                        key={index}
                                        // onClick={() => {
                                        //     setActiveDate(option.id);
                                        //     packageData(today, today);

                                        //     // packageData(today, today);
                                        // }}
                                        title={option.internalName}
                                        active={true}
                                    />
                                ))}
                                {/* <SelectDateCard
                                    title={"24h Ticket"}
                                    active={true}
                                    px="px-5"
                                    py="py-3"
                                    rounded="rounded-lg"
                                />
                                <SelectDateCard title={"48h Ticket"} px="px-5" py="py-3" rounded="rounded-lg" />
                                <SelectDateCard title={"72h Ticket"} px="px-5" py="py-3" rounded="rounded-lg" />
                                <SelectDateCard title={"One Run"} px="px-5" py="py-3" rounded="rounded-lg" /> */}
                            </div>
                        </div>
                        {/* <div className="p-3 bg-red-50 rounded-lg justify-start items-center gap-3 flex">
                            <div className="w-10 h-10 p-2 bg-red-200 rounded-full justify-center items-center flex">
                                <CoutionSvg />
                            </div>
                            <div className="text-red-500 font-medium leading-relaxed">
                                You can book this ticket and collects from the meeting point. This Ticket is not
                                available on Online website.{" "}
                            </div>
                        </div> */}
                        <div className="justify-start items-center gap-3 flex">
                            <div className="p-1 bg-red-200 rounded-full">
                                <MapPointerSvg />
                            </div>
                            <div className="font-medium leading-relaxed">
                                {availability[0]?.meetingPoint ?? "Please contact with support team!"}
                            </div>
                        </div>
                    </div>
                    <div className="w-full py-6 flex flex-col border-t border-b border-zinc-100 justify-start items-start gap-6 ">
                        <div className="flex flex-col justify-start items-start gap-5">
                            <div className="  text-lg font-semibold leading-none">Select Starting Time:</div>
                            <div className="justify-start items-start gap-2.5 flex flex-wrap">
                                {availability.map((time, index) => {
                                    return (
                                        <SelectDateCard
                                            key={index}
                                            title={time.openingHours[0].from}
                                            active={true}
                                            px="px-5"
                                            py="py-3"
                                            rounded="rounded-lg"
                                        />
                                    );
                                })}

                                {/* <SelectDateCard
                                    title={"10:25AM"}
                                    active={true}
                                    px="px-5"
                                    py="py-3"
                                    rounded="rounded-lg"
                                /> */}
                                {/* <SelectDateCard title={"10:25AM"} px="px-5" py="py-3" rounded="rounded-lg" />
                                <SelectDateCard title={"10:25AM"} px="px-5" py="py-3" rounded="rounded-lg" />
                                <SelectDateCard title={"10:25AM"} px="px-5" py="py-3" rounded="rounded-lg" />
                                <SelectDateCard title={"10:25AM"} px="px-5" py="py-3" rounded="rounded-lg" />
                                <SelectDateCard title={"10:25AM"} px="px-5" py="py-3" rounded="rounded-lg" /> */}
                            </div>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-5">
                            <div className="text-lg font-semibold leading-none">Select quantity</div>
                            <div className="  flex flex-col justify-start items-start gap-6 ">
                                {units.map((unit, index) => (
                                    <div key={index} className="w-full space-between items-center flex gap-2 md:gap-6">
                                        <div className=" font-semibold leading-relaxed mr-9">{unit.internalName}</div>
                                        <div className="justify-between items-center gap-2 md:gap-6 flex">
                                            <div className=" font-semibold leading-relaxed">{`${unit.pricingFrom[0].currency}$${unit.pricingFrom[0].net}`}</div>
                                            <div className="justify-between items-center gap-3 flex">
                                                <div
                                                    onClick={() =>
                                                        handleRemoveItem(
                                                            {
                                                                internalName: unit.internalName,
                                                                quantity: 0,
                                                            },
                                                            unit.pricingFrom[0].net
                                                        )
                                                    }
                                                >
                                                    <ItemCutSvg />
                                                </div>
                                                <div className="text-center">
                                                    {selectedItem.find((x) => x.internalName === unit.internalName)
                                                        ?.quantity ?? 0}
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        handleAddItem(
                                                            {
                                                                internalName: unit.internalName,
                                                                quantity: 1,
                                                            },
                                                            unit.pricingFrom[0].net
                                                        )
                                                    }
                                                >
                                                    <ItemPlusSvg />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className="w-full space-between items-center flex gap-2 md:gap}-6">
                                    <div className="flex flex-col font-semibold leading-relaxed">
                                        Adult
                                        <span className=" text-sm font-normal leading-snug">Under 5 yrs</span>
                                    </div>
                                    <div className="justify-between items-center gap-2 md:gap-6 flex">
                                        <div className=" font-semibold leading-relaxed">US$ 9.36</div>
                                        <div className="justify-between items-center gap-3 flex">
                                            <ItemCutSvg />
                                            <div className="text-center">20</div>
                                            <ItemPlusSvg />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch justify-between items-center gap-2.5 flex flex-wrap gap-y-8">
                        <div className="flex-col justify-start items-start gap-[18px] inline-flex">
                            <div className="justify-start items-center gap-[13px] inline-flex">
                                <div className=" font-bold capitalize">Form</div>
                                <div className="text-red-500 text-2xl font-extrabold capitalize">US$ {totalPrice}</div>
                            </div>
                            <div className="opacity-70  text-sm capitalize">Complete all required fields continue</div>
                        </div>
                        <div className="justify-start items-start gap-6 flex">
                            <button className="h-11 px-4 py-[13px] bg-white rounded-lg border border-slate-800 items-center gap-2.5 flex">
                                <div className="text-center  font-semibold leading-none">Add to cart</div>
                                <ShoppingBag />
                            </button>
                            <button className="h-11 px-5 py-4 bg-red-500 rounded-lg border border-red-500 justify-center items-center gap-2.5 flex text-white font-bold leading-none">
                                Book now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PackageOptions;
