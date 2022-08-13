import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getDepartmentById, editDepartment } from "../apiClient";

export const EditDepartment = () => {
  const params = useParams();
  const id = params.id;
  const [department, setDepartment] = useState({ name: "" });
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDepartmentById(id).then((response) => {
      setDepartment(response);
    });
  }, []);

  const saveUpdatedDepartment = async () => {
    const request = {};
    if (department.name !== "") {
      request["name"] = department.name;
    }
    editDepartment(id, request).then((response) => {
      if (response.success === false) {
        setError(response.error);
      } else {
        setMessage(`You succesfully updated ${department.name}`);
      }
      setDisabled(true);
    });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      saveUpdatedDepartment();
    }
  };

  const handleChange = (event) => {
    if (
      event.target.value !== ""
    ) {
      department.name = event.target.value;
    }
    setDepartment(department);
    setDisabled(false);
  };

  if (department === undefined) {
    return <div>Loading report ...</div>;
  } else {
    return (
        <div className="description">
        <label>
          Department
          <input
            className="input-data"
            type="text"
            value={department.name}
            onChange={(event) =>
              handleChange(event)
            }
          ></input>
        </label>
        <div>
            <Button
              className="my-3"
              disabled={isDisabled}
              onClick={saveUpdatedDepartment}
            >
              Save
            </Button>
          </div>
          <Link to="/department" className="edit-report-link">
            View all reports
          </Link>
      </div>
    )
};
};
