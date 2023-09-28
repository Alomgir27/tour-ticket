import { CancelRedSvg } from "@/components/Svg/CancelRedSvg";
import { CoutionSvg } from "@/components/Svg/CoutionSvg";
import { MapPointerSvg } from "@/components/Svg/MapPointerSvg";
import { ShoppingBag } from "@/components/Svg/ShoppingBag";
import { CalendarSvg } from "@/components/Svg/CalendarSvg";
import React from "react";
import SelectDateCard from "./SelectDateCard";

function PackageOptions() {
  return (
    <div className="w-full h-fit p-2.5 bg-slate-100 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch h-28 p-5 bg-white rounded-lg flex-col justify-start items-start gap-3 flex">
        <div className="self-stretch h-[15px]  text-lg font-bold leading-none">
          Select Date
        </div>
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <SelectDateCard title={'Today'} active={true}/>
          <SelectDateCard title={'Tomorrow'}  />
          <SelectDateCard title={'24 Jun'}  />
          <SelectDateCard title={'25 Jun'}  />
        
          <div className="grow shrink px-2 py-2.5 bg-white rounded-full border border-zinc-100 justify-center items-center gap-2.5 flex">
            <CalendarSvg />
            <p className="text-center  capitalize leading-none">
              More Date
            </p>
            
          </div>
        </div>
      </div>
      <div className="self-stretch p-5 bg-white rounded-lg flex-col justify-end items-start gap-8 flex">
        <div className="self-stretch flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch flex-col justify-start items-start gap-3 flex">
            <div className="self-stretch h-[15px]  text-lg font-bold leading-none">
              Package Type
            </div>
            <div className="justify-start items-start gap-2.5 flex w-fit">
            <SelectDateCard title={'24h Ticket'} active={true} px="px-5" py="py-4" rounded="rounded-lg"/>
            <SelectDateCard title={'48h Ticket'} px="px-5" py="py-4" rounded="rounded-lg" />
            <SelectDateCard title={'72h Ticket'} px="px-5" py="py-4" rounded="rounded-lg" />
            <SelectDateCard title={'One Run'} px="px-5" py="py-4" rounded="rounded-lg" />
            </div>
          </div>
          <div className="self-stretch p-[15px] bg-orange-50 rounded-lg justify-start items-center gap-3 inline-flex">
            <div className="w-10 h-10 p-[7px] bg-red-200 rounded-[30px] justify-center items-center flex">
              <CoutionSvg />
            </div>
            <div className="grow shrink basis-0 text-red-500 font-medium leading-relaxed">
              You can book this ticket and collects from the meeting point. This
              Ticket is not available on Online website.{" "}
            </div>
          </div>
          <div className="self-stretch justify-start items-center gap-3 inline-flex">
            <div className="w-6 h-6 p-[1px] bg-red-200 rounded-[30px] justify-center items-center flex">
              <MapPointerSvg />
            </div>
            <div className="grow shrink basis-0  font-medium leading-relaxed">
              Meet at 1 Bd Louis II, 98000 Monaco
            </div>
          </div>
        </div>
        <div className="self-stretch py-[30px] border-t border-b border-zinc-100 justify-start items-start gap-[100px] inline-flex">
          <div className="flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-[228px]  text-lg font-semibold leading-none">
              Opening/operating hours:
            </div>
            <div className="justify-start items-center gap-3 inline-flex">
              <CancelRedSvg />
              <div className=" font-medium leading-7">
                10:00 AM - 5:45 PM
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-start items-start gap-6 inline-flex">
            <div className="w-[134px]  text-lg font-semibold leading-none">
              Select quantity
            </div>
            <div className="self-stretch h-[86px] flex-col justify-start items-start gap-[25px] flex">
              <div className="self-stretch justify-between items-center inline-flex">
                <div className=" font-semibold leading-relaxed">
                  Adult
                </div>
                <div className="h-6 justify-between items-center gap-6 flex">
                  <div className=" font-semibold leading-relaxed">
                    US$ 9.36
                  </div>
                  <div className="h-6 justify-between items-center gap-3 flex">
                    <div className="w-6 h-6 relative" />
                    <div className="text-center  ">20</div>
                    <div className="w-6 h-6 relative" />
                  </div>
                </div>
              </div>
              <div className="self-stretch justify-between items-center inline-flex">
                <div className="grow shrink basis-0 h-[37px] flex-col justify-center items-start gap-3 inline-flex">
                  <div className=" font-semibold leading-relaxed">
                    Adult
                  </div>
                  <div className=" text-sm leading-snug">
                    Under 5 yrs
                  </div>
                </div>
                <div className="h-6 justify-between items-center gap-6 flex">
                  <div className=" font-semibold leading-relaxed">
                    US$ 9.36
                  </div>
                  <div className="h-6 justify-between items-center gap-3 flex">
                    <div className="w-6 h-6 relative" />
                    <div className="text-center  ">0</div>
                    <div className="w-6 h-6 relative" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch justify-between items-center gap-2.5 inline-flex">
          <div className="flex-col justify-start items-start gap-[18px] inline-flex">
            <div className="justify-start items-center gap-[13px] inline-flex">
              <div className=" font-bold capitalize">Form</div>
              <div className="text-red-500 text-2xl font-extrabold capitalize">
                US$ 9.36
              </div>
            </div>
            <div className="opacity-70  text-sm capitalize">
              Complete all required fields continue
            </div>
          </div>
          <div className="justify-start items-start gap-6 flex">
            <button className="h-11 px-4 py-[13px] bg-white rounded-lg border border-slate-800 items-center gap-2.5 flex">
              <div className="text-center  font-semibold leading-none">
                Add to cart
              </div>
              <ShoppingBag />
            </button>
            <button className="h-11 px-5 py-4 bg-red-500 rounded-lg border border-red-500 justify-center items-center gap-2.5 flex text-white font-bold leading-none">
              Book now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageOptions;
