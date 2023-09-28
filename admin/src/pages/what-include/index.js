import React, { useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";
import OverviewList from "../../components/ListComponent/OverviewList";
import WhatIncludeService from "../../../App/Services/WhatInclude/WhatIncludeService";
import WhatIncludeList from "../../components/ListComponent/WhatIncludeList";

const index = () => {
  const whatInclude = useSelector((state) => state.whatInclude.data);
  useEffect(() => {
    if (!whatInclude) {
      WhatIncludeService.getList();
    }
  }, []);
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4">
            <b>All What Include</b>
          </Card.Title>
          <Link href={"/what-include/create"}>
            <Button>Add What Include</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <WhatIncludeList whatInclude={whatInclude} />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default index;
