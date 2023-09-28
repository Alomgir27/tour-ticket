import { Button, Card } from "react-bootstrap";
import React, { use, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import ServiceList from "../../components/ListComponent/ServiceList";
import Pagination from "../../components/Pagination/Pagination";
import servicesService from "../../../App/Services/Service/servicesService";
import { useSelector } from "react-redux";

const Services = () => {
  const services = useSelector((state) => state.services.data);
  useEffect(() => {
    servicesService.getList();
  }, []);

  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4">
            <b>All Services</b>
          </Card.Title>
          <Link href={"/services/create"}>
            <Button>Add New Service</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <ServiceList serviceList={services} />
          {/* <Pagination serviceList={services} /> */}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default Services;
