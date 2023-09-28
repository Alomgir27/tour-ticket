import { Button, Card } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import CreateOverviewForm from "../../../components/AllForms/CreateOverviewForm";

const EditService = () => {
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Add New Overview</b>
          </Card.Title>

          <Link href={"/overview"}>
            <Button>Back to Overview</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <CreateOverviewForm />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditService;
