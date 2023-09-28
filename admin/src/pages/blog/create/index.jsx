import { Button, Card } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import CreateServiceForm from "../../../components/AllForms/CreateServiceForm";
import CreateBlogForm from "../../../components/AllForms/CreateBlogForm";

const index = () => {
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Add New Blog</b>
          </Card.Title>

          <Link href={"/blog"}>
            <Button>Back to Blog</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <CreateBlogForm />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default index;
