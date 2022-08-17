import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getDepartmentById,
  deleteDepartmentById,
  getEmployeesByDepartmentId,
} from "../apiClient";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./css/getDepartmentById.css";
import Container from "react-bootstrap/esm/Container";
import { EmployeeTable } from "./employeeTable";
import * as ReactBootStrap from "react-bootstrap";

export const DepartmentInfo = () => {
  const params = useParams();
  const department_id = params.id;
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [displayTable, setDisplayTable] = useState(false);
  let props = {
    department: department,
    employees: employees,
  };

  useEffect(() => {
    getDepartmentById(department_id).then((response) =>
      setDepartment(response[0])
    );
    getEmployeesByDepartmentId(department_id).then((response) =>
      setEmployees(response)
    );
  }, []);

  const deleteDepartment = () => {
    deleteDepartmentById(department_id)
      .then(() => navigate("/department"))
      .catch((err) => {
        setError(err);
      });
  };

  const editDepartment = () => {
    getDepartmentById(department_id).then((response) =>
      navigate(`/department/${department_id}/edit`)
    );
  };

  const displayEmployees = () => {
    setDisplayTable(true);
  };

  if (department === undefined) {
    return <div>Loading department ...</div>;
  } else {
    return (
      <div>
        <Container>
          <h4 className="title">{department.department_name}</h4>
          {/* <div>Head of department </div> <br /> */}
          <div>There are {department.count} members in this department</div>
          <br />
          <div>Average salary is £{department.avg}</div>
          <br />
          <div className="d-flex flex-row">
            <div class="btn-group">
              <Button className="btn btn-success my-2" onClick={editDepartment}>
                Edit
              </Button>
            </div>
            <div class="btn-group">
              <Button className="mx-2 my-2" onClick={deleteDepartment}>
                Delete
              </Button>
            </div>
            <div>
              <p className="error">
                {error !== "" ? <p style={{ color: "red" }}>{error}</p> : ""}
              </p>
            </div>
          </div>
          <br />

          <Link
            to={`/department/${department_id}/employee/create`}
            style={{ textDecoration: "none" }}
          >
            Add employee to {department.department_name}
          </Link>
          <div>
            <Button
              variant="link"
              class="blink btn btn-link p-0"
              onClick={displayEmployees}
            >
              View all employees of {department.department_name}
            </Button>
          </div>
          {displayTable ? <EmployeeTable {...props} /> : ""}
        </Container>
      </div>
    );
  }
};
