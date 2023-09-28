import { Button, Card } from "react-bootstrap";
import React, { useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import EditOverviewForm from "../../../components/AllForms/EditOverviewForm";
import { useSelector } from "react-redux";
import OverviewService from "../../../../App/Services/Overview/OverviewService";
import { useRouter } from "next/router";

const EditOverview = () => {
  const router = useRouter();
  const overview = useSelector((state) => state.overview.singleOverview);
  console.log(router.query);
  useEffect(() => {
    if (!overview) {
      OverviewService.singleOverview(router.query.overview_id);
    }
  }, [router.query.overview_id]);
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Update Overview</b>
          </Card.Title>
          <Link href={"/overview"}>
            <Button>Back to Overview</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <EditOverviewForm overview={overview} />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditOverview;
