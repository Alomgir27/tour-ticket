import React from "react";

function BreadCrumb() {
    return (
        <div className=" capitalize gap-[7px] flex flex-wrap ">
            <div>Home</div>
            <div>/</div>
            <div>Category</div>
            <div>/</div>
            <div>Subcategory</div>
            <div>/</div>
            <div>Details</div>
        </div>
    );
}

export default BreadCrumb;
