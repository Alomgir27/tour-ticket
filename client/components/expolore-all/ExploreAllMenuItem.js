import React from "react";
import { motion } from "framer-motion";

const ExploreAllMenuItem = ({ active = false, children, onClick }) => {
    const boxShadowStyle = active ? { boxShadow: "0px 14px 66px 0px rgba(87, 29, 11, 0.2)", width: "100%" } : {};
    return (
        <div
            onClick={onClick}
            className={` px-[29px] py-2  rounded-[5px]  justify-center items-center gap-2.5 inline-flex cursor-pointer relative`}
        >
            <div className="text-center text-slate-800 text-base font-bold capitalize leading-loose">{children}</div>
            {active && (
                <motion.div
                    layoutId="explore-tabs"
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-full  rounded-xl font-bold text-lg shadow z-10"
                    style={boxShadowStyle}
                    // style={{ }}
                    transition={{
                        type: "tween",
                        bounce: ".25",
                        stiffness: "80",
                        damping: "9",
                        duration: ".3",
                    }}
                />
            )}
        </div>
    );
};

export default ExploreAllMenuItem;
