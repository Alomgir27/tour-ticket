import React from "react";
import Summary from "./Summary";
import RowsPerPage from "./RowsPerPage";
import Paginate from "./Paginate";

export default function Pagination({ serviceList }) {
  return (
    <div className="row align-items-center justify-content-center">
      <Summary
        from={10}
        // to={serviceList?.current_page * serviceList?.per_page}
        total={serviceList?.total}
      />
      <RowsPerPage perPage={20} setPerPage={20} />
      <Paginate
        currentPage={serviceList?.current_page}
        lastPage={serviceList?.last_page}
        setPage={20}
      />
    </div>
  );
}
