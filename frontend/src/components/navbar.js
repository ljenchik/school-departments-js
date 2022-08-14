import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";

export const Navbar1 = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <div><Navbar.Brand href="/department">Departments</Navbar.Brand></div>
        <div><Navbar.Brand href="/employee">Employees</Navbar.Brand></div>
        <div><Nav.Link href="/department/create">Create report</Nav.Link></div>
      </Container>
    </Navbar>
  );
};
