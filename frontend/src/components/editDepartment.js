import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { getDepartmentById, editDepartment } from "../apiClient";
import "./css/editDepartment.css";
import Container from "react-bootstrap/esm/Container";

export const EditDepartment = () => {
  const params = useParams();
  const department_id = params.id;
  const [department, setDepartment] = useState({});
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDepartmentById(department_id).then((response) => {
      setDepartment(response[0]);
    });
  }, []);

  const handleChange = (event) => {
    if (event.target.value !== "") {
      department.department_name = event.target.value;
    }
    setDepartment({ ...department });
    console.log(department);
    setDisabled(false);
  };

  const saveUpdatedDepartment = async () => {
    const request = {};
    if (department.department_name !== "") {
      request.name = department.department_name;
    }
    editDepartment(department_id, request).then((response) => {
      if (response.success === false) {
        setError(response.error);
      } else {
        setMessage(`You succesfully updated ${department.department_name}`);
      }
      setDisabled(true);
    });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      saveUpdatedDepartment();
    }
  };

  if (department === undefined) {
    return <div>Loading report ...</div>;
  } else {
    return (
      <Container>
          <h4 className="title">Update department name </h4>
          <input
            className="input-data"
            type="text"
            value={department.department_name}
            onChange={(event) => handleChange(event)}
          ></input>

          {/* <h4>Update head of department</h4>
          <input
            className="input-data"
            type="text"
            value={""}
            onChange={(event) => handleChange(event)}
          ></input> */}

          <div>
            <Button
              className="my-3"
              disabled={isDisabled}
              onKeyDown={handleKeyPress}
              onClick={saveUpdatedDepartment}
            >
              Save
            </Button>
          </div>
          <Link to="/department" className="view-all-dep-link">
            View all departments
          </Link>
      </Container>
    );
  }
};
