import React, { useState } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import servicesService from "../../../App/Services/Service/servicesService";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateServiceForm() {
  const router = useRouter();
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
  const handleSubmit = (e) => {
    e.preventDefault();
    servicesService.createService(serviceData)
    .then((res) => {  
      console.log(res);
      router.push("/services");
    })
    .catch((err) => {
      console.log(err);
    });
    // Handle form submission here
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FormLabel as={"h4"}>
        Service Related Information <hr className="" />
      </FormLabel>
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
              onChange={handleImageChange}
              name="images"
              type="file"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name={"short_description"}
              placeholder="Short Description"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name={"discount"}
              placeholder="Discount %"
              type="number"
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name={"activity_feature"}
              placeholder="Activity Features"
            />
          </Col>
        </Row>
      </Card.Body>

      <FormLabel as={"h4"}>
        Service Details Image <hr className="" />
      </FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <Form.Control
              multiple={true}
              onChange={handleDetailsImageChange}
              name="detail_images"
              type="file"
            />
          </Col>
          <Col></Col>
        </Row>
      </Card.Body>

      <FormLabel as={"h4"}>
        Service Details Packages <hr className="" />
      </FormLabel>
      <Card.Body className="d-flex flex-column gap-4">
        <Row>
          <Col>
            <DatePicker
              selected={serviceData.tour_date}
              onChange={(date) =>
                setServiceData((prevData) => ({
                  ...prevData,
                  tour_date: date,
                }))
              }
              name="tour_date"
              placeholderText="Tour Date"
              dateFormat="dd/MM/yyyy" // Customize the date format
              minDate={new Date()} // Disable past date
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
              className="form-control w-100"
            />
            
            {/* <Form.Control
              onChange={handleInputChange}
              name="tour_date"
              placeholder="Tour Date"
              value={serviceData.tour_date}
            /> */}
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
              selected={serviceData.opening_hours}
              onChange={(date) =>
                setServiceData((prevData) => ({
                  ...prevData,
                  opening_hours: date,
                }))
              }
              name="opening_hours"
              placeholderText="Opening Hours"
              dateFormat="h:mm aa" // Customize the date format
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              className="form-control w-100"
            />
            {/* <Form.Control
              onChange={handleInputChange}
              name="opening_hours"
              placeholder="Opening Hours"
              value={serviceData.opening_hours}
            /> */}
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

      <FormLabel as={"h4"}>
        Service Details Experiances <hr className="" />
      </FormLabel>
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

      <FormLabel as={"h4"}>
        Service Details Overviews <hr className="" />
      </FormLabel>
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
      <FormLabel as={"h4"}>
        Service What Includes <hr className="" />
      </FormLabel>
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
        Submit
      </Button>
    </Form>
  );
}

export default CreateServiceForm;
