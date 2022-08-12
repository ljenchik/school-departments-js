import React, { useState } from "react";
import { createDepartment } from "../apiClient"; 
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const CreateDepartment = () => {
  const [department, setDepartment] = useState({name : ""});
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleChangeDepartmentName = (event) => {
    department["name"] = event.target.value;
    setDepartment(department);
    console.log(department);
  };

  const submit = (event) => {
    const request = {};
    if (department["name"] !== "") {
      request["name"] = department["name"];
    }
    createDepartment(request).then((response) => {
      if (response.success === true) {
        navigate(`/department/${response.id}`);
      } else {
        setError(response.error);
      }
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
      <div>
        <h3 className="title">Add department</h3>
      </div>
      <Link to="/department" className="link">
        {" "}
        View all departments{" "}
      </Link>
      <fieldset className="fieldset" onKeyDown={handleKeyPress} tabIndex="0">
        <hr />
          <div>
            <label>
              Department name
              <input
                className="input-large-large search-query mx-3"
                type="text"
                placeholder="Enter a department name"
                onChange={(event) =>
                  handleChangeDepartmentName(event)
                }
                value={department.name}
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

