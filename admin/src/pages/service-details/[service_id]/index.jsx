import { Button, Card } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import EditServiceForm from "../../../components/AllForms/EditServiceForm";
import { useSelector } from "react-redux";
import servicesService from "../../../../App/Services/Service/servicesService";
import { useRouter } from "next/router";

const EditService = (props) => {
  const service = useSelector((state) => state.services.service);
  const router = useRouter();

  useEffect(() => {
    if (service != "undefined" || service != null) {
      servicesService.getSingle(router.query.service_id);
    }
  }, [router]);

  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Edit Service</b>
          </Card.Title>

          <Link href={"/services"}>
            <Button>Back to Services</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <EditServiceForm />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditService;
