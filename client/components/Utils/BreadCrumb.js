import React from "react";

function BreadCrumb({ path }) {
    return (
        <div className=" capitalize gap-[7px] flex flex-wrap ">
          {path?.split("?")[0].split("/").map((item, index) => {
            return (
              <div key={index} className="flex items-center">
                <span className="text-sm text-gray-600">{item}</span>
                {index !== path.length - 1 && (
                  <svg
                    className="h-5 w-5 fill-current text-gray-600 mx-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 5.293a1 1 0 011.414 0L10 7.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            );
          }
            )}
        </div>
    );
}

export default BreadCrumb;
