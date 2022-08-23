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

  //const department = getDepartmentById(department_id);
  
  if (employees === undefined) {
    return <div>Loading data ...</div>;
  } else if (employees.length === 0 ) {
    return (
      <Container>
        <h4 className="title">Employees of </h4>
        <div>There are no employees in this department</div>
        <div>
          <Link
            to={`/department/${department_id}/employee/create`}
            className="add-link"
          >
            {" "}
            Add a new employee to 
          </Link>
        </div>
      </Container>
    );
  } else {
    return (
      <Container>
        <h3 className="title">Employees of {employees[0].department_name}</h3>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <th>Name</th>
            <th>Photo</th>
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
                <td> 
                  
                   <Link
            to={`/employee/${id}`}
          >
            <img className="employee-photo" src={employee.photo} />
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
        <br />
        <div>
          <Link
            to={`/department/${department_id}/employee/create`}
            className="add-link"
          >
            {" "}
            Add a new employee to {employees[0].department_name}
          </Link>
        </div>
        <div>
          <Link to={`/department/${department_id}`} className="add-link">
            {" "}
            Back to {employees[0].department_name}
          </Link>
        </div>
      </Container>
    );
  }
};
