import React from "react";
import { motion } from "framer-motion";

function SlideMenuCard({ title, activeTab, setActiveTab }) {
    const isActive = activeTab === title;
    return (
        <li
            onClick={() => setActiveTab(title)}
            data-active={isActive}
            className={`relative cursor-pointer h-[62px] px-2 lg:px-8 last:border-none  justify-center items-center gap-[10px] flex text-center text-sm lg:text-lg capitamotion.lize isolate leading-loose `}
        >
            <span>{title}</span>
            {isActive && (
                <motion.div
                    layoutId="tabs"
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-full bg-white rounded-xl font-bold text-lg shadow -z-10"
                    style={{ width: "100%" }}
                    transition={{
                        type: "tween",
                        bounce: ".25",
                        stiffness: "80",
                        damping: "9",
                        duration: ".3",
                    }}
                />
            )}
        </li>
    );
}

export default SlideMenuCard;
