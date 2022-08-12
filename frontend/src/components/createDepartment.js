import React, { useState } from "react";
import { createDepartment } from "../apiClient"; 
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const CreateDepartment = () => {
  const [value, setValue] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const submit = (event) => {
    const request = {};
    if (value["DepartmentName"] !== "") {
      request["DepartmentName"] = value["DepartmentName"];
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
    setValue("");
    setMessage("");
    setError("");
    setDisabled(false);
  };

  const handleChange = (event, name) => {
      value[name] = event.target.value;
    setValue({ ...value });
  };

  const handleChangeDepartmentName = (event, name) => {
    value[name] = event.target.value;
    setValue({ ...value });
  };

  return (
    <div>
      <div>
        <h3 className="title">Add department</h3>
      </div>
      <Link to="/" className="link">
        {" "}
        View all departments{" "}
      </Link>
      <fieldset className="fieldset" onKeyDown={handleKeyPress} tabIndex="0">
        <hr />
          <div>
            <label>
              Name
              <input
                className="input-large-large search-query mx-3"
                type="text"
                name="name"
                placeholder="Enter a report name"
                onChange={(event) =>
                  handleChangeDepartmentName(event, "ReportName")
                }
                value={value["ReportName"]}
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
        <div className="message">
          {error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <p style={{ color: "green" }}>{message}</p>
          )}
        </div>
      </fieldset>
    </div>
  );
};
