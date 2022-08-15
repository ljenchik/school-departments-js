import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

export function Navbar1() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="/department">Departments</Navbar.Brand>
        <Navbar.Brand href="/employee">Employees</Navbar.Brand>
        <Nav.Link href="/department/create">Add department</Nav.Link>
        {/* <Nav.Link href="/employee/create">Add employee</Nav.Link> */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav" fixed="top">
          <Nav className="me-auto">
            <Nav.Link href="/employee">Employees</Nav.Link>
            <Nav.Link href="/department/create">Add department</Nav.Link>
            <Nav.Link href="/employee/create">Add employee</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
