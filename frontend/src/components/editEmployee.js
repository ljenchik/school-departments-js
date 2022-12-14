import React, { useState, useEffect } from "react";
import { editEmployee } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../apiClient";
import "./css/editEmployee.css";
import { Container } from "react-bootstrap";

export const EditEmployee = () => {
  const params = useParams();
  const employee_id = params.id;
  const [employee, setEmployee] = useState({});
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeById(employee_id).then((response) => {
      setEmployee(response[0]);
    });
  }, []);

  const handleChangeEmployeeName = (event) => {
    employee.name = event.target.value;
    setEmployee({ ...employee });
    setDisabled(false);
  };

  const handleChangeEmployeeRole = (event) => {
    employee.role = event.target.value;
    setEmployee({ ...employee });
    setDisabled(false);
  };

  const handleChangeEmployeeDob = (event) => {
    employee.dob = event.target.value;
    setEmployee({ ...employee });
    setDisabled(false);
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
    setDisabled(false);
  };

  const handleChangeEmployeeStartDate = (event) => {
    employee.start_date = event.target.value;
    setEmployee({ ...employee });
    setDisabled(false);
  };

  const handleChangeEmployeeSalary = (event) => {
    employee.salary = parseFloat(event.target.value);
    setEmployee({ ...employee });
    setDisabled(false);
  };

  const handleChangeEmployeePhoto = (event) => {
    employee.photo = event.target.value;
    setEmployee({ ...employee });
    setDisabled(false);
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      saveUpdatedEmployee();
    }
  };

  const saveUpdatedEmployee = (event) => {
    const request = {};
    if (employee.name !== "") {
      request.name = employee.name;
    }
    if (employee.role !== "") {
      request.role = employee.role;
    }
    if (employee.dob !== "") {
      request.dob = new Date(employee.dob);
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
      request.start_date = new Date(employee.start_date);
    }
    if (employee.salary !== "") {
      request.salary = employee.salary;
    }
    if (employee.photo !== "") {
      request.photo = employee.photo;
    }
    editEmployee(employee_id, request).then((response) => {
      if (!response.success) { 
        setError(response.error.slice(1, -1));
      } else {
        navigate(`/employee/${employee_id}`);
      }
    });
  };

  return (
    <Container>
      <h3 className="title">Update employee details</h3>
      <fieldset className="fieldset" onKeyDown={handleKeyPress} tabIndex="0">
        <div>
          <label>Name</label> <br />
          <input
            className="update input-large-large search-query my-2"
            type="text"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeName(event)}
            value={employee.name}
          ></input>
        </div>

        <div>
          <label>Role</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="text"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeRole(event)}
            value={employee.role}
          ></input>
        </div>

        <div>
          <label>Date of birth</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="date"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeDob(event)}
            value={employee.dob}
          ></input>
        </div>

        <div>
          <label>Address</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="address"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeAddress(event)}
            value={employee.address}
          ></input>
        </div>

        <div>
          <label>Phone (+44 xxxx xxxxxx)</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="phone"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeePhone(event)}
            value={employee.phone}
          ></input>
        </div>

        <div>
          <label>Email</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="email"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeEmail(event)}
            value={employee.email}
          ></input>
        </div>

        <div>
          <label>Start date</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="date"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeStartDate(event)}
            value={employee.start_date}
          ></input>
        </div>

        <div>
          <label>Salary</label> <br />
          <input
            className="input-large-large search-query my-2"
            type="number"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeeSalary(event)}
            value={employee.salary}
          ></input>
        </div>

        <div>
          <label>Photo (optional)</label>
          <br />
          <input
            className="input-large-large search-query my-2"
            type="url"
            style={{ width: '75%' }}
            onChange={(event) => handleChangeEmployeePhoto(event)}
            value={employee.photo}
          ></input>
        </div>
      <div className="d-flex flex-row">
        <Button
          className="my-4"
          disabled={isDisabled}
          onClick={saveUpdatedEmployee}
        >
          Save
        </Button>
        <p className="error">
                {error !== "" ? <p style={{ color: "red" }}>{error}</p> : ""}
              </p>
              </div>
      </fieldset>

      <div>
        <Link to={`/department/${employee.department_id}/employee`} className="link">
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
