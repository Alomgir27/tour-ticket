import React, { useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import OverviewService from "../../../App/Services/Overview/OverviewService";
import { useSelector } from "react-redux";
import OverviewList from "../../components/ListComponent/OverviewList";

const index = () => {
  const overview = useSelector((state) => state.overview.overview);
  useEffect(() => {
    if (!overview) {
      OverviewService.getList();
    }
  }, []);

  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4">
            <b>All Overview</b>
          </Card.Title>
          <Link href={"/overview/create"}>
            <Button>Add Overview</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <OverviewList overviewList={overview} />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default index;
