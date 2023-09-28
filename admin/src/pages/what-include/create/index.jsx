import { Button, Card } from "react-bootstrap";
import React from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import CreateWhatIncludeForm from "../../../components/AllForms/CreateWhatIncludeForm";

const EditService = () => {
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Add New What Include</b>
          </Card.Title>

          <Link href={"/what-include"}>
            <Button>Back to What Include</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <CreateWhatIncludeForm />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditService;
