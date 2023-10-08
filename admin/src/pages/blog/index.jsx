import React, { useEffect } from "react";
import AdminLayout from "../../layout/AdminLayout/AdminLayout";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import { useSelector } from "react-redux";
import BlogList from "../../components/ListComponent/BlogList";
import BlogService from "../../../App/Services/Blog/BlogService";

const index = () => {
  const { blogList } = useSelector((state) => state.blog);
  useEffect(() => {
    BlogService.getList();
  }, []);
  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4">
            <b>All Blogs</b>
          </Card.Title>
          <Link href={"/blog/create"}>
            <Button>Add Blog</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <BlogList blogList={blogList} />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default index;
