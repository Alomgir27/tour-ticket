import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import THSort from "../TableSort/THSort";
import WhatIncludeService from "../../../App/Services/WhatInclude/WhatIncludeService";

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

const WhatIncludeList = (props) => {
  const { whatInclude } = props;
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
          <th>Description</th>

          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {whatInclude &&
          whatInclude.data.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>

              <td>{item.title}</td>
              <td>{item.description}</td>

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
                      href={`/what-include/${item.id}`}
                      passHref
                      onClick={() => WhatIncludeService.single(item.id)}
                    >
                      <Dropdown.Item as="a">Edit</Dropdown.Item>
                    </Link>
                    <Dropdown.Item
                      className="text-danger"
                      onClick={() => WhatIncludeService.delete(item.id)}
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

export default WhatIncludeList;
