import { Button, Card } from "react-bootstrap";
import React, { useEffect } from "react";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import WhatIncludeService from "../../../../App/Services/WhatInclude/WhatIncludeService";
import EditWhatIncludeForm from "../../../components/AllForms/EditWhatIncludeForm";

const EditOverview = () => {
  const router = useRouter();
  const whatInclude = useSelector((state) => state.whatInclude.single);
  useEffect(() => {
  if(router.query.whatinclude_id){
    if (!whatInclude || whatInclude.id != router.query.whatinclude_id ) {
      WhatIncludeService.single(router.query.whatinclude_id);
    }
  }
  }, [router.query.whatinclude_id]);
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Update What Include</b>
          </Card.Title>
          <Link href={"/what-include"}>
            <Button>Back to What Include</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <EditWhatIncludeForm whatInclude={whatInclude} />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditOverview;
