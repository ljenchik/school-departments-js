import React, { useState, useEffect} from "react";
import { editEmployee } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getEmployeeById } from "../apiClient";

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
    setEmployee({...employee});
    setDisabled(false);

  };

  const handleChangeEmployeeRole = (event) => {
        employee.role = event.target.value;
    setEmployee({...employee});
    setDisabled(false);
  };

  const handleChangeEmployeeDob = (event) => {
        employee.dob = event.target.value;
    setEmployee({...employee});
    setDisabled(false);
  };

  const handleChangeEmployeeAddress = (event) => {
        employee.address = event.target.value;
    setEmployee({...employee});
  };

  const handleChangeEmployeeEmail = (event) => {
        employee.email = event.target.value;
    setEmployee({...employee});
    setDisabled(false);
  };

  const handleChangeEmployeeStartDate = (event) => {
        employee.start_date = event.target.value;
    setEmployee({...employee});
    setDisabled(false);
  };

  const handleChangeEmployeeSalary = (event) => {
    employee.salary = parseFloat(event.target.value);
    setEmployee({...employee});
    setDisabled(false);
};

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      saveUpdatedEmployee();
    }
  };
  
  const saveUpdatedEmployee = (event) => {
    const request = {};
    if (employee.name!== "") {
      request.name = employee.name;
    }
    if (employee.role!== "") {
        request.role = employee.role;
      }
      if (employee.dob!== "") {
        request.dob = new Date (employee.dob);
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
      if (employee.salary!== "") {
        request.salary = new Date (employee.salary);
      }
    editEmployee(employee_id, request).then((response) => {
      if (response.success === true) {
        navigate(`/employee/${employee_id}`);
      } else {
        setError(response.error);
      }
      setDisabled(true);
    });
  };

  return (
    <div>
      <div>
        <h3 className="title">Update employee details</h3>
      </div> <br/>
      <Link to="/department" className="link">
        {" "}
        View all departments{" "} 
      </Link><br/>
      <Link to="/employee" className="link">
        {" "}
        View all employees{" "}
      </Link><br/>
      <fieldset className="fieldset" onKeyDown={handleKeyPress} tabIndex="0">
        <hr />
        <div>
          <label>
            Name
            <input
              className="input-large-large search-query mx-3"
              type="text"
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
          <label>
            Salary
            <input
              className="input-large-large search-query mx-3"
              type="number"
              onChange={(event) => handleChangeEmployeeSalary(event)}
              value={employee.salary}
            ></input>
          </label>
        </div>
        <hr />


        <Button
              className="my-3"
              disabled={isDisabled}
              onClick={saveUpdatedEmployee}
            >
              Save
            </Button>
        <div></div>
      </fieldset>
    </div>
  );
};
