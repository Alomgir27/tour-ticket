import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import WhatIncludeService from "../../../App/Services/WhatInclude/WhatIncludeService";

function EditWhatIncludeForm({ whatInclude }) {
  const router = useRouter();
  const [whatIncludeData, setWhatIncludeData] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    if (whatInclude != "undefined" || whatInclude != null) {
      setWhatIncludeData({
        title: whatInclude?.data.title,
        description: whatInclude?.data.description,
      });
    }
  }, [whatInclude]);

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
    WhatIncludeService.update(whatIncludeData, router.query.whatinclude_id)
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
                placeholder={whatInclude?.data.title}
                value={whatIncludeData.title}
              />
            </Col>
            <Col>
              <Form.Control
                onChange={handleInputChange}
                name={"description"}
                placeholder={whatInclude?.data.description}
                value={whatIncludeData.description}
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

export default EditWhatIncludeForm;
