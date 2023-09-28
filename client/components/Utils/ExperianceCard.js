import React from "react";

function ExperianceCard({ title, description }) {
    return (
        <div className="w-full p-[15px] bg-white rounded-2xl justify-between items-center gap-2.5 flex flex-col lg:flex-row">
            <div className=" text-lg font-bold leading-none min-w-max pr-5">{title}</div>
            <div className="flex-col justify-start items-start gap-3 inline-flex">
                {/* dangerously set html */}
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
        </div>
    );
}

export default ExperianceCard;
