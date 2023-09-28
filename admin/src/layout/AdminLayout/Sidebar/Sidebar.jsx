import React, { useEffect, useState } from "react";
import classNames from "classnames";
import SidebarNav from "./SidebarNav";

export default function Sidebar(props) {
  const { isShow, isShowMd } = props;
  const [isNarrow, setIsNarrow] = useState(false);

  const toggleIsNarrow = () => {
    const newValue = !isNarrow;
    localStorage.setItem("isNarrow", newValue ? "true" : "false");
    setIsNarrow(newValue);
  };

  // On first time load only
  useEffect(() => {
    if (localStorage.getItem("isNarrow")) {
      setIsNarrow(localStorage.getItem("isNarrow") === "true");
    }
  }, [setIsNarrow]);

  return (
    <div
      className={classNames("sidebar d-flex flex-column position-fixed h-100", {
        "sidebar-narrow": isNarrow,
        show: isShow,
        "md-hide": !isShowMd,
      })}
      id="sidebar"
    >
      <div className="sidebar-brand d-none d-md-flex align-items-center justify-content-center">
        <div className="sidebar-brand-full">
          <h5>Cuore Travel</h5>
        </div>
        {/* <svg className="sidebar-brand-narrow d-none" width="46" height="46">
                    <title>CoreUI Logo</title>
                    <use xlinkHref="/assets/brand/coreui.svg#signet" />
                </svg> */}
      </div>

      <div className="sidebar-nav flex-fill">
        <SidebarNav />
      </div>
    </div>
  );
}

export const SidebarOverlay = (props) => {
  const { isShowSidebar, toggleSidebar } = props;

  return (
    <div
      tabIndex={-1}
      aria-hidden
      className={classNames(
        "sidebar-overlay position-fixed top-0 bg-dark w-100 h-100 opacity-50",
        {
          "d-none": !isShowSidebar,
        }
      )}
      onClick={toggleSidebar}
    />
  );
};
