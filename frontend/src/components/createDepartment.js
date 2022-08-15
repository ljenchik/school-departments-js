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
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChangeDepartmentName = (event) => {
    department.name = event.target.value;
    setDepartment(department);
  };

  const submit = (event) => {
    const request = {};
    if (department.name !== "") {
      request["name"] = department.name;
    }
    createDepartment(request).then((response) => {
      if (response.success === true) {
        navigate(`/department`);
      } else {
        setError(response.error);
      }
    setDisabled(true);
    });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      submit();
    }
  };

  const reset = (event) => {
    setDepartment({});
    setError("");
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
                placeholder="Enter a department name"
                onChange={(event) => handleChangeDepartmentName(event)}
                value={department.name}
              ></input>
            </label>
          </div>
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
