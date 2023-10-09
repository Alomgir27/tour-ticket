import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import THSort from "../TableSort/THSort";
import BlogService from "../../../App/Services/Blog/BlogService";
import NextImage from "../../utils/NextImage";

const typeColorMap = {
  normal: "#aa9",
  fighting: "#b54",
  flying: "#89f",
  poison: "#a59",
  ground: "#db5",
  rock: "#ba6",
  bug: "#ab2",
  ghost: "#66b",
  steel: "#aab",
  fire: "#f42",
  water: "#39f",
  grass: "#7c5",
  electric: "#fc3",
  psychic: "#f59",
  ice: "#6cf",
  dragon: "#76e",
  dark: "#754",
  fairy: "#e9e",
  unknown: "#aa9",
  shadow: "#aa9",
};

const TypeLabel = ({ type }) => (
  <span
    className="text-white d-inline-block text-uppercase text-center rounded-1 shadow-sm me-2"
    style={{
      backgroundColor: typeColorMap[type],
      textShadow: "1px 1px 2px rgb(0 0 0 / 70%)",
      fontSize: ".7rem",
      width: "70px",
    }}
  >
    {type}
  </span>
);

const BlogList = (props) => {
  const { blogList } = props;
 


  return (
    <Table responsive bordered hover>
      <thead className="bg-light">
        <tr>
          <th>
            <THSort name="id">#</THSort>
          </th>
          <th>
            <THSort name="name">title</THSort>
          </th>
          <th>thumbnail</th>
          <th>Short Desc.</th>
          <th>Tag</th>
          <th>Is Top Blog</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {blogList &&
          blogList?.data?.data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>

              <td>{item.title}</td>
              <td className="flex justify-content-center">
                <NextImage className="img-fluid h-auto rounded shadow-sm"
                src={item.thumbnail}
                alt="thumbnail"
                width={40}
                height={40}
                />
              </td>
              <td>{item.short_desc}</td>
              <td>{item.tag}</td>
              <th>{item.is_top_blog}</th>
              <td>
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as="button"
                    bsPrefix="btn"
                    className="btn-link rounded-0 text-black-50 shadow-none p-0"
                    id={`action-${"pokemon.id"}`}
                  >
                    <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link
                      href={`/blog/${item.id}`}
                      passHref
                      onClick={() => BlogService.singleBlog(item.id)}
                    >
                      <Dropdown.Item as="a">Edit</Dropdown.Item>
                    </Link>
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => BlogService.delete(item.id)}
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
