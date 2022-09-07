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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isDisabled, setDisabled] = useState(true);
  const [employeesByDob, setEmployeesByDob] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response));
    getAllDepartments().then((response) => setDepartments(response));
  }, []);

  const handleChangeDepartment = (event) => {
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

  const handleChangeStartDate = (event) => {
    const start = new Date(event.target.value).toISOString().slice(0, 10);
    setStartDate(start);
    if (startDate !== 'dd/mm/yyyy') {
      setDisabled(false);
    }
  };

  const handleChangeEndDate = (event) => {
    const end = new Date(event.target.value).toISOString().slice(0, 10);
    setEndDate(end);
    if (endDate !== 'dd/mm/yyyy') {
      setDisabled(false);
    }
  };

  const search = (event) => {
    if (startDate === 'dd/mm/yyyy' && endDate === 'dd/mm/yyyy') {
      setDisabled(true);
    }
    else if (startDate !== 'dd/mm/yyyy' && endDate === 'dd/mm/yyyy'){
      getAllEmployeesByDob(startDate, new Date().toJSON().slice(0,10)).then((response) => {
        setEmployeesByDob(response);
        setSearchTableDisplay(true);
      });
    }
    else if (startDate === 'dd/mm/yyyy' && endDate !== 'dd/mm/yyyy'){
      getAllEmployeesByDob('1900-01-01', endDate).then((response) => {
        setEmployeesByDob(response);
        setSearchTableDisplay(true);
      });
    }
    else {
      getAllEmployeesByDob(startDate, endDate).then((response) => {
        setEmployeesByDob(response);
        setSearchTableDisplay(true);
      });
    }
    
  };

  const reset = (event) => {
    getAllEmployees().then((response) => {
      setEmployees(response);
      setSearchTableDisplay(false);
      setStartDate('dd/mm/yyyy');
      setEndDate('dd/mm/yyyy');
      setDisabled(true);
    });
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
            Filter employees by date of birth from
          </label>
        <input type="date" onChange={handleChangeStartDate} value={startDate}/>
          <label className="add-dep-label">to</label>
          <input type="date" onChange={handleChangeEndDate} value={endDate}/>
          <Button
            className="btn btn-success my-3 mx-2"
            onClick={search}
            disabled={isDisabled}
          >
            Search
          </Button>

          <Button
            className="btn btn-success my-3 mx-2"
            onClick={reset}
          >
            Clear dates
          </Button>
          <br />

         {searchTableDisplay ? <GetAllEmployeesTable employees={employeesByDob} /> : <GetAllEmployeesTable employees={employees} />} 

          <label className="add-dep-label">Add employee to department</label>
          <select
            className="select-department"
            value={department}
            onChange={handleChangeDepartment}
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
