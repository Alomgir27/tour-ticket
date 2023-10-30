import { Button, Card } from "react-bootstrap";
import React, { use, useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import Pagination from "../../components/Pagination/Pagination";
import { useSelector } from "react-redux";
// import ServiceDetailsService from "../../../App/Services/ServiceDetails/ServiceDetailsService";
import ServiceDetailsList from "../../components/ListComponent/ServiceDetailsList";

const ServiceDetails = () => {
  const services = useSelector((state) => state.services.data);
  // useEffect(() => {
  //   ServiceDetailsService.getList();
  // }, []);

  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4">
            <b>All Service Details</b>
          </Card.Title>
          <Link href={"/service-details/create"}>
            <Button>Add Service Details</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <ServiceDetailsList serviceList={services} />
          {/* <Pagination serviceList={services} /> */}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default ServiceDetails;
