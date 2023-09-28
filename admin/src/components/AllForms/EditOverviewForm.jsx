import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import OverviewService from "../../../App/Services/Overview/OverviewService";
import { useState } from "react";
import { useRouter } from "next/router";

function EditOverviewForm({ overview }) {
  const router = useRouter();
  const [overviewData, setOverviewData] = useState({
    title: "",
    description: "",
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
    OverviewService.update(overviewData, router.query.overview_id);
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
                placeholder={overview?.data.title}
              />
            </Col>
            <Col>
              <Form.Control
                onChange={handleInputChange}
                name={"description"}
                placeholder={overview?.data.description}
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

export default EditOverviewForm;
