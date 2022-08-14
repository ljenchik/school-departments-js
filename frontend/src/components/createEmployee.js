import React, { useState } from "react";
import { createEmployee } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'

export const CreateEmployee = () => {
  const params = useParams(); 
  const department_id = params.id;
  console.log(department_id);
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    dob: "",
    address: "",
    email: "",
    start_date: "",
    department_id : parseInt(department_id)
  });
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChangeEmployeeName = (event) => {
        employee.name = event.target.value;
    setEmployee({...employee});
  };

  const handleChangeEmployeeRole = (event) => {
        employee.role = event.target.value;
    setEmployee({...employee});
  };

  const handleChangeEmployeeDob = (event) => {
        employee.dob = event.target.value;
    setEmployee({...employee});
  };

  const handleChangeEmployeeAddress = (event) => {
        employee.address = event.target.value;
    setEmployee({...employee});
  };

  const handleChangeEmployeeEmail = (event) => {
        employee.email = event.target.value;
    setEmployee({...employee});
  };

  const handleChangeEmployeeStartDate = (event) => {
        employee.start_date = event.target.value;
    setEmployee({...employee});
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      submit();
    }
  };
  
  const reset = (event) => {
    setEmployee({});
    setError("");
    setDisabled(false);
  };


  const submit = (event) => {
    const request = {};
    if (employee.name!== "") {
      request.name = employee.name;
    }
    if (employee.role!== "") {
        request.role = employee.role;
      }
      if (employee.dob!== "") {
        request.dob = employee.dob;
      }
      if (employee.address!== "") {
        request.address = employee.address;
      }
      if (employee.email!== "") {
        request.email = employee.email;
      }
      if (employee.start_date!== "") {
        request.start_date = employee.start_date;
      }
    createEmployee(department_id, request).then((response) => {
      if (response.success === true) {
        navigate(`/department/${department_id}/employee`);
      } else {
        setError(response.error);
      }
    });
  };

  return (
    <div>
      <div>
        <h3 className="title">Add employee</h3>
      </div>
      <Link to="/department" className="link">
        {" "}
        View all departments{" "}
      </Link>
      <Link to="/employee" className="link">
        {" "}
        View all employees{" "}
      </Link>
      <fieldset className="fieldset" onKeyDown={handleKeyPress} tabIndex="0">
        <hr />
        <div>
          <label>
            Name
            <input
              className="input-large-large search-query mx-3"
              type="text"
              placeholder="Enter a name"
              onChange={(event) => handleChangeEmployeeName(event)}
              value={employee.name}
            ></input>
          </label>
        </div>
        <hr />

        <div>
          <label>
            Role
            <input
              className="input-large-large search-query mx-3"
              type="text"
              placeholder="Enter a role"
              onChange={(event) => handleChangeEmployeeRole(event)}
              value={employee.role}
            ></input>
          </label>
        </div>
        <hr />

        <div>
          <label>
            Date of birth
            <input
              className="input-large-large search-query mx-3"
              type="date"
              onChange={(event) => handleChangeEmployeeDob(event)}
              value={employee.dob}
            ></input>
          </label>
        </div>
        <hr />

        <div>
          <label>
            Address
            <input
              className="input-large-large search-query mx-3"
              type="text"
              onChange={(event) => handleChangeEmployeeAddress(event)}
              value={employee.address}
            ></input>
          </label>
        </div>
        <hr />

        <div>
          <label>
            Email
            <input
              className="input-large-large search-query mx-3"
              type="email"
              onChange={(event) => handleChangeEmployeeEmail(event)}
              value={employee.email}
            ></input>
          </label>
        </div>
        <hr />



        <div>
          <label>
            Start date
            <input
              className="input-large-large search-query mx-3"
              type="date"
              onChange={(event) => handleChangeEmployeeStartDate(event)}
              value={employee.start_date}
            ></input>
          </label>
        </div>
        <hr />


        <div>
          <Button
            className="btn btn-success my-1"
            disabled={isDisabled}
            onClick={submit}
          >
            Submit
          </Button>
          <Button className="mx-2 my-1" onClick={reset}>
            Reset
          </Button>
        </div>
        <div></div>
      </fieldset>
    </div>
  );
};
