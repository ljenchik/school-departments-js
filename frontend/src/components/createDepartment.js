import React, { useState } from "react";
import { createDepartment } from "../apiClient";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import "./css/createDepartment.css";
import Container from "react-bootstrap/esm/Container";

export const CreateDepartment = () => {
  const [department, setDepartment] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChangeDepartmentName = (event) => {
    setDepartment({department_name : event.target.value});
    if (department.department_name !== "") {
      setError("");
    }
  };

  const submit = (event) => {
    const request = {};
    if (department.department_name) {
      request.name = department.department_name;
      createDepartment(request).then((response) => {
        if (response.success === false) {
          if (response.error.includes("duplicate key value violates unique constraint")) {
            setError("Department with this name already exists");
          }
          else {setError(response.error);}
        } else {
          setMessage(`You succesfully added ${department.department_name}`);
          //navigate(`/department`);
        }
        setDisabled(true);
      });
    } 
    else {
    setError("Enter department name");
    }
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  const reset = (event) => {
    setDepartment({department_name: ""});
    setError("");
    setMessage("");
    setDisabled(false);
  };

  return (
    <div>
      <Container>
        <h4 className="title">Add a new department</h4>
        <fieldset className="fieldset" onKeyDown={handleKeyPress} tabIndex="0">
          <div>
            <label>
              <input
                className="dep-name-input"
                type="text"
                placeholder="Enter department name"
                value={department.department_name}
                onChange={(event) => handleChangeDepartmentName(event)}
              ></input>
            </label>
          </div>
          <div className="d-flex">
            <Button
              className="btn btn-success my-3 mx-2"
              disabled={isDisabled}
              onKeyDown={handleKeyPress}
              onClick={submit}
            >
              Submit
            </Button>
            <Button className="mx-2 my-3" onClick={reset} >
              Reset
            </Button>
            <div className="error-message">
                {error !== "" ? (
                  <div style={{ color: "red" }}>{error}</div>
                ) : (
                  <div style={{ color: "green" }}>{message}</div>
                )}
              </div>
          </div>
        </fieldset>
        <br />
        <div>
          <Link to="/department" className="view-all-dep-link">
            {" "}
            View all departments{" "}
          </Link>
        </div>
      </Container>
    </div>
  );
};
