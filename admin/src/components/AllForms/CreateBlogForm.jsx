import React, { useState } from "react";
import { Card, Col, FormLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import BlogService from "../../../App/Services/Blog/BlogService";
import { useRouter } from "next/router";

function CreateBlogForm() {
  const router = useRouter();
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    tag: null,
    short_desc: "",
    details: "",
    is_top_blog: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setBlogData((prevData) => ({
      ...prevData,
      image: imageFile,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    BlogService.create(blogData)
      .then((res) => {
        console.log("res", res);
        router.push("/blog");

      })
      .catch((err) => {
        console.log("err", err);
      });
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
              value={blogData.title}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleImageChange}
              type="file"
              name="image"
              placeholder="Image"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name="tag"
              placeholder="tag"
              value={blogData.tag}
            />
          </Col>
          <Col>
            <Form.Control
              onChange={handleInputChange}
              name={"short_desc"}
              placeholder="Short Description"
              value={blogData.short_desc}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <textarea
              class="form-control"
              onChange={handleInputChange}
              name={"details"}
              placeholder="Details"
              rows="3"
              value={blogData.details}
            ></textarea>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              onChange={handleInputChange}
              name={"is_top_blog"}
              label="Is Top Blog"
              value={blogData.is_top_blog}
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

export default CreateBlogForm;
