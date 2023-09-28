import React from "react";

function ImportantInfoList() {
  return (
    <div className="flex-col justify-start items-start gap-3 inline-flex">
      <div className="flex-col justify-start items-start gap-2.5 flex">
        <div className="font-bold">What to bring</div>
        <li className="list-inside">Passport or ID card</li>
      </div>
      <div className="self-stretch h-[98px] flex-col justify-start items-start gap-2.5 flex">
        <div className="font-bold">Not allowed</div>
        <ul className="flex-col list-disc list-inside justify-start items-start gap-2.5 flex">
          <li>Pets</li>
          <li>Smoking</li>
        </ul>
      </div>
      <ul className="self-stretch h-[179px] flex-col justify-start items-start gap-2.5 flex">
        <div className="font-bold">Know before you go</div>
        <ul className="flex-col list-disc list-inside justify-start items-start gap-2.5 flex">
          <li>
            Vouchers are valid for 1 year from the date of travel on the voucher
          </li>
          <li>
            Entrance to the Alcazar is temporarily free so it will not be listed
            on any of the tickets
          </li>
          <li>Alcazar is closed on Mondays</li>
        </ul>
      </ul>
    </div>
  );
}

export default ImportantInfoList;
