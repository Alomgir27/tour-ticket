import React from "react";
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="footer border-top px-sm-2 py-2">
      <Container
        fluid
        className="align-items-center flex-column flex-md-row d-flex justify-content-between"
      >
        <div>
          <span className="text-decoration-none">Cuore Travel </span>
          <span className="text-decoration-none">Your Partner</span> © 2023
          Cuore Travel.
        </div>
        <div className="ms-md-auto">
          Powered by&nbsp;
          <a
            className="text-decoration-none"
            href="/#"
          >
            Cuore Travel
          </a>
        </div>
      </Container>
    </footer>
  );
}
