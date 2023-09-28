import { useState } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverviewService from "../../../App/Services/Overview/OverviewService";

function CreateOverviewForm() {
  const [overviewData, setOverviewData] = useState({
    title: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOverviewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    OverviewService.create(overviewData);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Card.Body className="d-flex flex-column gap-4">
          <Row>
            <Col>
              <Form.Control
                onChange={handleInputChange}
                name={"title"}
                placeholder="Title"
              />
            </Col>
            <Col>
              <Form.Control
                onChange={handleInputChange}
                name={"description"}
                placeholder="Details"
              />
            </Col>
          </Row>
        </Card.Body>

        {/* <FormLabel as={"h4"}>
          Applicant Wallet Information <hr className="" />
        </FormLabel> */}
        {/* add success btn justify end */}
        <Button variant="success" type="submit" className="float-end">
          Update
        </Button>
      </Form>
    </>
  );
}

export default CreateOverviewForm;
