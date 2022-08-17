import React, { useEffect, useState } from "react";
import { getEmployeesByDepartmentId } from "../apiClient";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as ReactBootStrap from "react-bootstrap";
import "./css/getEmployeesByDepartmentId.css";
import Container from "react-bootstrap/esm/Container";

export const GetEmployeesByDepartmentId = (id) => {
  const [employees, setEmployees] = useState([]);
  const params = useParams();
  const department_id = params.id;

  useEffect(() => {
    getEmployeesByDepartmentId(department_id).then((response) =>
      setEmployees(response)
    );
  }, []);

  return (
    <Container>
        <h3 className="title">Employees of ?????</h3>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <th>Name</th>
            <th>Role</th>
            <th>Date of birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Start date</th>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <Link
                    to={`/employee/${employee.id}`}
                    className="employee-link"
                  >
                    {employee.name}
                  </Link>
                </td>
                <td>{employee.role}</td>
                <td>{employee.dob}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>£{employee.salary}</td>
                <td>{employee.start_date}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      <br/>
        <Link to={`/department/${department_id}/employee/create`}  className="add-link"> Add a new employee to </Link>
    </Container>
  );
};
