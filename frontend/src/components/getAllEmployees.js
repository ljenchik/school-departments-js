import React, { useEffect, useState } from "react";
import { getAllEmployees, getAllEmployeesByDob } from "../apiClient";
import { GetAllEmployeesTable } from "./getAllEmployeesTable";
import Container from "react-bootstrap/esm/Container";
import { getAllDepartments } from "../apiClient";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./css/getAllEmployees.css";

export const GetAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [department, setDepartment] = useState();
  const [searchTableDisplay, setSearchTableDisplay] = useState(false);
  const [dob, setDob] = useState();
  const [employeesByDob, setEmployeesByDob] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response));
    getAllDepartments().then((response) => setDepartments(response));
    getAllEmployeesByDob().then((response) => setEmployeesByDob(response));
  }, []);

  const handleChange = (event) => {
    setDepartment(event.target.value);
  };

  const submit = (event) => {
    for (let i = 0; i < departments.length; i++) {
      if (departments[i].department_name === department) {
        navigate(`/department/${departments[i].id}/employee/create`);
      }
      if (department === "Add department") {
        navigate(`/department/create`);
      }
    }
  };

  const handleChangeDate = (event) => {
    setDob(event.target.value);
  };

  const search = (event) => {
    setSearchTableDisplay(true);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  return (
    <Container>
      <div className="container">
        <h3 className="title">Employees</h3>

        <label className="add-dep-label">
          Search employee by date of birth from
        </label>
        <input type="date" onChange={handleChangeDate} />
        <label className="add-dep-label">to</label>
        <input type="date" onChange={handleChangeDate} />
        <Button className="btn btn-success my-3 mx-2" onClick={search}>
          Search
        </Button>
        <br />

        <GetAllEmployeesTable employees={employees} />
        <br />
        <label className="add-dep-label">Add employee to department</label>
        <select
          className="select-department"
          value={department}
          onChange={handleChange}
        >
          <option>Choose department</option>
          {departments.map((department) => (
            <option>{department.department_name}</option>
          ))}
          <option>Add department</option>
        </select>

        <Button
          className="btn btn-success my-3 mx-2"
          onKeyDown={handleKeyPress}
          onClick={submit}
        >
          Submit
        </Button>
      </div>
    </Container>
  );
};
