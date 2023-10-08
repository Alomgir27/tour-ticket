import { useState } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import WhatIncludeService from "../../../App/Services/WhatInclude/WhatIncludeService";
import { useRouter } from "next/router";

function CreateWhatIncludeForm() {
  const router = useRouter();
  const [whatIncludeData, setWhatIncludeData] = useState({
    title: "",
    details: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWhatIncludeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    WhatIncludeService.create(whatIncludeData)
      .then((res) => {
        router.push("/what-include");
      })
      .catch((err) => {
        console.log(err);
      });
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
          Create
        </Button>
      </Form>
    </>
  );
}

export default CreateWhatIncludeForm;
