import React, { useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import AdminLayout from "../../../layout/AdminLayout/AdminLayout";
import EditBlogForm from "../../../components/AllForms/EditBlogForm";
import { useSelector } from "react-redux";
import BlogService from "../../../../App/Services/Blog/BlogService";
import { useRouter } from "next/router";


const EditBlog = () => {
    const router = useRouter();
    const blog = useSelector((state) => state.blog.singleBlog);

    useEffect(() => {
        if(router.query.blog_id){
            if (!blog || blog.id != router.query.blog_id ) {
            BlogService.singleBlog(router.query.blog_id);
            }
        }
        }, [router.query.blog_id]);

  return (
    <AdminLayout>
      <Card>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title as="h4" className="d-flex gap-2">
            <b>Update Blog</b>
          </Card.Title>

          <Link href={"/blog"}>
            <Button>Back to Blog</Button>
          </Link>
        </Card.Header>
        <Card.Body>
          <EditBlogForm blog={blog} />
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default EditBlog;
