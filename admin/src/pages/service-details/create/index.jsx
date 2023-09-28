import { Button, Card } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import CreateServiceForm from "../../../components/AllForms/CreateServiceForm";

const EditService = () => {
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Add New Service</b>
          </Card.Title>

          <Link href={"/services"}>
            <Button>Back to Services</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <CreateServiceForm />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditService;
