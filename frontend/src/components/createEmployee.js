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
  const [departmentName, setDepartmentName]= useState("");
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    start_date: "",
    salary: "",
    photo: "",
    department_id: parseInt(department_id),
  });
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDepartmentById(department_id).then((response) => {
      setDepartmentName(response[0].department_name);
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

  const handleChangeEmployeePhoto = (event) => {
    employee.photo = event.target.value;
    console.log(employee.photo);
    setEmployee({ ...employee });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  const reset = (event) => {
    setEmployee({name: "",
    role: "",
    dob: "",
    address: "",
    phone: "",
    email: "",
    start_date: "",
    salary: "",
    photo: "",
    department_id: parseInt(department_id)});
    setError("");
    setDisabled(false);
  };

  const submit = (event) => {
    const request = {};
    Object.entries(employee).forEach(([key, value]) => {
        request[key] = value;
      }
    )
    createEmployee(department_id, request).then((response) => {
      if (!response.success) { 
        setError(response.error.slice(1, -1));
      } else {
        navigate(`/department/${department_id}`);
      }
    });
  };

  return (
    <Container>
      <h3 className="title">Add employee to {departmentName}</h3>
      <fieldset onKeyDown={handleKeyPress} tabIndex="0">
        <div>
          <label>
            Name 
            </label> 
            <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="text"
              style={{ width: '75%' }}
              placeholder="Enter name"
              onChange={(event) => handleChangeEmployeeName(event)}
              value={employee.name}
            ></input>
        </div>
        <div>
          <label>
            Role
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="text"
              style={{ width: '75%' }}
              placeholder="Enter role"
              onChange={(event) => handleChangeEmployeeRole(event)}
              value={employee.role}
            ></input>
        </div>


        <div>
          <label>
            Date of birth
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="date"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeeDob(event)}
              value={employee.dob}
            ></input>
        </div>

        <div>
          <label>
            Address
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="address"
              style={{ width: '75%' }}
              placeholder="Enter address"
              onChange={(event) => handleChangeEmployeeAddress(event)}
              value={employee.address}
            ></input>
        </div>

        <div>
          <label>
            Phone
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="tel"
              style={{ width: '75%' }}
              placeholder="Enter phone number"
              onChange={(event) => handleChangeEmployeePhone(event)}
              value={employee.phone}
            ></input>
        </div>

        <div>
          <label>
            Email
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="email"
              style={{ width: '75%' }}
              placeholder="Enter email address"
              onChange={(event) => handleChangeEmployeeEmail(event)}
              value={employee.email}
            ></input>
        </div>

        <div>
          <label>
            Start date
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="date"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeeStartDate(event)}
              value={employee.start_date}
            ></input>
        </div>

        <div>
          <label>
            Salary £
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="number"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeeSalary(event)}
              value={employee.salary}
            ></input>
        </div>

        <div>
          <label>
            Photo (optional)
            </label> <br/>
            <input
              className="input-large-large search-query my-2 mb-3"
              type="url"
              placeholder="https://example.com"
              pattern="https://.*"
              style={{ width: '75%' }}
              onChange={(event) => handleChangeEmployeePhoto(event)}
              value={employee.photo}
            ></input>
        </div>

        <div className="d-flex flex-row">
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
          <p className="error">
                {error !== "" ? <p style={{ color: "red" }}>{error}</p> : ""}
              </p>

        </div>
      </fieldset>

      <div>
        <Link to={`/department/${department_id}/employee`} className="link">
          {" "}
          View all employees of {departmentName}
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
