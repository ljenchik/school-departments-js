import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../apiClient";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteEmployeeById } from "../apiClient";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./css/getEmployeeById.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export const GetEmployeeById = () => {
  const [employee, setEmployee] = useState([]);
  const params = useParams();
  const employee_id = params.id;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployeeById(employee_id).then((response) => setEmployee(response[0]));
  }, []);

  const deleteEmployee = () => {
    deleteEmployeeById(employee_id)
      .then((response) => navigate(`/department/${employee.department_id}`))
      .catch((err) => {
        setError(err);
      });
  };

  const editEmployee = () => {
    getEmployeeById(employee_id).then((response) =>
      navigate(`/employee/${employee_id}/edit`)
    );
  };

  if (employee === undefined) {
    return <div>Loading report ...</div>;
  } else {
    return (
      <Container style={{ "margin-top": "80px" }}>
        <div className="flex-container">
          <div>
            {employee.photo ? (
              <div className="flex-left">
                <img className="employee-photo" src={employee.photo} />
              </div>
            ) : (
              <div className="flex-left">
                <OverlayTrigger overlay={<Tooltip>Add employee photo</Tooltip>}>
                  {({ ref, ...triggerHandler }) => (
                    <Link
                      ref={ref}
                      to={`/employee/${employee_id}/edit`}
                      variant="light"
                      {...triggerHandler}
                    >
                      <img
                        className="employee-photo"
                        src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                      />
                    </Link>
                  )}
                </OverlayTrigger>
              </div>
            )}
          </div>

          <div className="flex-right">
            <Row>
              <Col>Name</Col>
              <Col xs={9}>{employee.name}</Col>
            </Row>

            <Row>
              <Col>Department</Col>
              <Col xs={9}>
                <Link
                  className="link"
                  to={`/department/${employee.department_id}/employee`}
                >
                  {employee.department_name}
                </Link>
              </Col>
            </Row>

            <Row>
              <Col>Role</Col>
              <Col xs={9}>{employee.role}</Col>
            </Row>

            <Row>
              <Col>Date of birth</Col>
              <Col xs={9}>{employee.dob}</Col>
            </Row>

            <Row>
              <Col>Address</Col>
              <Col xs={9}>{employee.address}</Col>
            </Row>

            <Row>
              <Col>Phone</Col>
              <Col xs={9}>{employee.phone}</Col>
            </Row>

            <Row>
              <Col>Email</Col>
              <Col xs={9}>{employee.email}</Col>
            </Row>

            <Row>
              <Col>Salary</Col>
              <Col xs={9}>??{employee.salary}</Col>
            </Row>

            <Row>
              <Col>Hiring date</Col>
              <Col xs={9}>{employee.start_date}</Col>
            </Row>
          </div>
          {/* </Row> */}
        </div>

        <br />
        <div className="d-flex flex-row">
          <Button className="btn btn-success my-2" onClick={editEmployee}>
            Edit
          </Button>
          <Button className="mx-2 my-2" onClick={deleteEmployee}>
            Delete
          </Button>
        </div>
        <br />
        <div>
          <Link to={`/department/${employee.department_id}`} className="link">
            {" "}
            View all employees of {employee.department_name}
          </Link>
        </div>
        <div>
          <Link to="/department" className="link">
            {" "}
            View all departments{" "}
          </Link>
        </div>
        <div>
          <Link to="/employee" className="link">
            {" "}
            View all employees{" "}
          </Link>
        </div>
      </Container>
    );
  }
};
