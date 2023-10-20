import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Dropdown, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Link from "next/link";
import THSort from "../TableSort/THSort";
import axios from "axios";

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

const DashboardList = (props) => {
  const { serviceList } = props;
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const params = {
        localDate: "2021-09-01",
        localDateStart: "2021-09-01",
        localDateEnd: "2025-09-01",
        productId: "20ef1799-7020-484b-9fb5-905ec5bb5444",
      }


      const res = await fetch(`https://api.ventrata.com/octo/bookings/20ef1799-7020-484b-9fb5-905ec5bb5444`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_VENTRATA_API_KEY}`,
          "Octo-Capabilities": process.env.NEXT_PUBLIC_VENTRATA_CAPABILITIES,
        },
        method: "POST",
        body: JSON.stringify(params),
      });
      const json = await res.json();
      console.log(json);
      setProducts(json);
    })();
  }
    , []);


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
          <th>Tags</th>
          <th className="text-center">Discount</th>
          <th className="text-end">Price</th>
          <th className="text-end">Actual Price</th>
          <th className="text-end">Activity Feature</th>
          <th aria-label="Action" />
        </tr>
      </thead>
      <tbody>
        {/* {pokemons.map((pokemon) => ( */}
        <tr>
          <td>'asdfa'</td>

          <td>'asdahfsd</td>
          <td>''</td>

          <td className="text-end">{""}</td>
          <td className="text-end">{""}</td>
          <td className="text-end">{""}</td>
          <td className="text-end">{""}</td>

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
                <Dropdown.Item href="#/action-1">Info</Dropdown.Item>
                <Link href="/approve-loan/edit" passHref>
                  <Dropdown.Item as="a">Edit</Dropdown.Item>
                </Link>
                <Dropdown.Item className="text-danger" href="#/action-3">
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
        {/* ))} */}
      </tbody>
    </Table>
  );
};

export default DashboardList;
