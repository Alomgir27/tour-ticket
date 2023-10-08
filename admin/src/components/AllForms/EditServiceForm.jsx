import React, { useState, useEffect } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import servicesService from "../../../App/Services/Service/servicesService";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

function EditServiceForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const service = useSelector((state) => state?.services?.service?.data);
  const [services, setServices] = useState(service || null);
  const [serviceData, setServiceData] = useState({
    title: "",
    tags: "",
    price: "",
    images: null,
    short_description: "",
    discount: "",
    detail_images: null,
    activity_feature: "",
    tour_date: "",
    tour_type: "",
    meeting_point: "",
    opening_hours: "",
    ticket_details: "",
    full_description: "",
    highlights: "",
    important_information: "",
    service_overviews: "",
    service_includes: "",
  });

  useEffect(() => {
    if (service != "undefined" || service != null) {
      setServices(service);
    }
  }, [service]);


  useEffect(() => {
    setServiceData({
      title: services?.title || "",
      tags: services?.tags || "",
      price: services?.price || "",
      short_description: services?.short_description || "",
      discount: services?.discount || "",
      activity_feature: services?.activity_feature || "",
      tour_date: services?.serviceDetailPackage?.tour_date ? new Date(services?.serviceDetailPackage?.tour_date) : "",
      tour_type: services?.serviceDetailPackage?.tour_type || "",
      meeting_point: services?.serviceDetailPackage?.meeting_point || "",
      starting_time: services?.serviceDetailPackage?.starting_time ? new Date(services?.serviceDetailPackage?.starting_time) : "",
      ticket_details: services?.serviceDetailPackage?.ticket_details || "",
      full_description: services?.service_exp?.length ? services?.service_exp[0]?.full_description : "",
      highlights: services?.service_exp?.length ? services?.service_exp[0]?.highlights : "",
      important_information: services?.service_exp?.length ? services?.service_exp[0]?.important_information : "",
      service_overviews: services?.service_overview?.service_overviews || "",
      service_includes: services?.what_includes?.length ? services?.what_includes[0]?.service_includes : "",
    });
  }, [services]);

  useEffect(() => {
    if(services == null && router.asPath.split("/")[2] != undefined && router.asPath.split("/")[2] != null && router.asPath.split("/")[2] != "" && router.asPath.split("/")[2] != "[service_id]"){
      servicesService.getSingle(router.asPath.split("/")[2])
      .then((res) => {
        setServices(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [router]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setServiceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setServiceData((prevData) => ({
      ...prevData,
      images: imageFile,
    }));
  };

  const handleDetailsImageChange = (e) => {
    const imagesArray = [];
    for (let i = 0; i < e.target?.files?.length; i++) {
      imagesArray.push(e.target.files[i]);
    }

    
    setServiceData((prevData) => ({
      ...prevData,
      detail_images: imagesArray,
    }));
  };

  const handleDateChange = (date, name) => {
    setServiceData((prevData) => ({
      ...prevData,
      [name]: date,
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    servicesService.updateService(services?.id, serviceData)
    .then((res) => {  
      console.log(res);
      router.push("/services");
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
   
  };

  if (loading) {
    return <h1 className="text-center m-5 p-5">Loading...</h1>;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel as={"h4"}>Service Related Information</FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="title"
              placeholder="Title"
              value={serviceData.title}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="tags"
              placeholder="Tags"
              value={serviceData.tags}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="price"
              placeholder="Price"
              value={serviceData.price}
              type="number"
            />
          </Col>
          <Col>
            <Form.Control
              type="file"
              placeholder="Image"
              name="images"
              onChange={handleImageChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="short_description"
              placeholder="Short Description"
              value={serviceData.short_description}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="discount"
              placeholder="Discount %"
              value={serviceData.discount}
              type="number"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="activity_feature"
              placeholder="Activity Features"
              value={serviceData.activity_feature}
            />
          </Col>
        </Row>
      </Card.Body>

      <FormLabel as={"h4"}>Service Details Image</FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <Form.Control
              multiple={true}
              name="detail_images"
              type="file"
              onChange={handleDetailsImageChange}
            />
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>

      <FormLabel as={"h4"}>Service Details Packages</FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <DatePicker
              selected={serviceData.tour_date}
              onChange={(date) => handleDateChange(date, "tour_date")}
              name="tour_date"
              placeholderText="Tour Date"
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
              className="form-control w-100"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="tour_type"
              placeholder="Tour Type"
              value={serviceData.tour_type}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="meeting_point"
              placeholder="Meeting Point"
              value={serviceData.meeting_point}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DatePicker
              selected={serviceData.starting_time}
              onChange={(date) => handleDateChange(date, "starting_time")}
              name="starting_time"
              placeholderText="starting_time"
              dateFormat="h:mm aa"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              className="form-control w-100"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="ticket_details"
              placeholder="Ticket Details"
              value={serviceData.ticket_details}
            />
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>

      <FormLabel as={"h4"}>Service Details Experiences</FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="full_description"
              placeholder="Full Description"
              value={serviceData.full_description}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="highlights"
              placeholder="Highlights"
              value={serviceData.highlights}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="important_information"
              placeholder="Important Information"
              value={serviceData.important_information}
            />
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>

      <FormLabel as={"h4"}>Service Details Overviews</FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="service_overviews"
              placeholder="Service Overviews"
              value={serviceData.service_overviews}
            />
          </Col>
        </Row>
      </Card.Body>
      <FormLabel as={"h4"}>Service What Includes</FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="service_includes"
              placeholder="Service Includes"
              value={serviceData.service_includes}
            />
          </Col>
        </Row>
      </Card.Body>

      <Button variant="success" type="submit" className="float-end">
        Update
      </Button>
    </Form>
  );
}

export default EditServiceForm;
