import React, { useEffect, useState } from "react";
import { createEmployee } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDepartmentById } from "../apiClient";
import { Container } from "react-bootstrap";
import "./css/createEmployee.css";

export const CreateEmployee = () => {
  const params = useParams();
  const department_id = params.id;
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    start_date: "",
    salary: "",
    department_id: parseInt(department_id),
    department_name: "",
  });
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(department_id).then((response) => {
      setEmployee(response[0]);
    });
  }, []);

  const handleChangeEmployeeName = (event) => {
    employee.name = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeRole = (event) => {
    employee.role = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeDob = (event) => {
    employee.dob = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeAddress = (event) => {
    employee.address = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeePhone = (event) => {
    employee.phone = event.target.value;
    setEmployee({ ...employee });
  };
  const handleChangeEmployeeEmail = (event) => {
    employee.email = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeStartDate = (event) => {
    employee.start_date = event.target.value;
    setEmployee({ ...employee });
  };

  const handleChangeEmployeeSalary = (event) => {
    employee.salary = parseFloat(event.target.value);
    setEmployee({ ...employee });
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
    if (employee.name !== "") {
      request.name = employee.name;
    }
    if (employee.role !== "") {
      request.role = employee.role;
    }
    if (employee.dob !== "") {
      request.dob = employee.dob;
    }
    if (employee.address !== "") {
      request.address = employee.address;
    }
    if (employee.phone !== "") {
      request.phone = employee.phone;
    }
    if (employee.email !== "") {
      request.email = employee.email;
    }
    if (employee.start_date !== "") {
      request.start_date = employee.start_date;
    }
    if (employee.salary !== "") {
      request.salary = employee.salary;
    }
    request.department_name = employee.department_name;
    createEmployee(department_id, request).then((response) => {
      if (response.success === true) {
        navigate(`/department/${department_id}/employee`);
      } else {
        setError(response.error);
      }
    });
  };

  return (
    <Container>
      <h3 className="title">Add employee to {employee.department_name}</h3>
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
              type="address"
              placeholder="Enter an address"
              onChange={(event) => handleChangeEmployeeAddress(event)}
              value={employee.address}
            ></input>
          </label>
        </div>
        <hr />

        <div>
          <label>
            Phone
            <input
              className="input-large-large search-query mx-3"
              type="phone"
              placeholder="Enter an address"
              onChange={(event) => handleChangeEmployeePhone(event)}
              value={employee.phone}
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
              placeholder="Enter an email"
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
          <label>
            Salary £
            <input
              className="input-large-large search-query mx-3"
              type="number"
              onChange={(event) => handleChangeEmployeeSalary(event)}
              value={employee.salary}
            ></input>
          </label>
        </div>
        <hr />

        <div>
          <Button
            className="btn btn-success my-4"
            disabled={isDisabled}
            onClick={submit}
          >
            Submit
          </Button>
          <Button className="mx-2 my-4" onClick={reset}>
            Reset
          </Button>
        </div>
      </fieldset>

      <div>
        <Link to="/department" className="link">
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
};
