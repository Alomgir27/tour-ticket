import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditServiceForm({ service }) {
  return (
    <>
      <Form>
        
        <Card.Body className="d-flex flex-column gap-4">
          <Row>
            <Col>
              <Form.Control value={service?.data?.title} placeholder="Title" />
            </Col>
            <Col>
              <Form.Control value={service?.data?.tags} placeholder="Tags" />
            </Col>
            <Col>
              <Form.Control value={service?.data?.price} placeholder="Price" />
            </Col>
            <Col>
              <Form.Control type="file" placeholder="Image" />
              {/* add image field */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control
                value={service?.data?.short_description}
                placeholder="Actual Price"
              />
            </Col>
            <Col>
              <Form.Control
                value={service?.data?.actual_price}
                placeholder="Actual Price"
              />
            </Col>
            <Col>
              <Form.Control
                value={service?.data?.discount}
                placeholder="Discount %"
              />
            </Col>
            <Col>
              <Form.Control
                value={service?.data?.activity_feature}
                placeholder="Activity Features"
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

export default EditServiceForm;
