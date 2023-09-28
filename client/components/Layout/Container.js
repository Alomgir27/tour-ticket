import React from "react";

function Container({ children, customClass }) {
  return <div className={`w-full max-xl:px-4 xl:w-[1240px] mx-auto ${customClass}`}>{children}</div>;
}

export default Container;
