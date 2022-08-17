import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDepartmentById, deleteDepartmentById } from "../apiClient";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./css/getDepartmentById.css";
import Container from "react-bootstrap/esm/Container";

export const DepartmentInfo = () => {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    getDepartmentById(id).then((response) => setDepartment(response[0]));
  }, []);

  const deleteDepartment = () => {
    deleteDepartmentById(id)
    .then(() => navigate("/department"))
      .catch((err) => {
        setError(err);
      });
  };
  //   console.log("Response status code", response.status);
  //   if (response !== undefined) {
  //     if (response.status === 200) {
  //       navigate("/department");
  //     } else {
  //       setError("You can't delete department with employees");
  //     }
  //   }
  //   else {
  //     setError("Report is undefined");
  //   }
  // };

  const editDepartment = () => {
    getDepartmentById(id).then((response) =>
      navigate(`/department/${id}/edit`)
    );
  };

  if (department === undefined) {
    return <div>Loading department ...</div>;
  } else {
    return (
      <div>
        <Container>
          <h4 className="title">{department.department_name}</h4>
          <br />
          <div>Head of department </div> <br />
          <div>There are {department.count} members in this department</div>
          <br />
          <div>Average salary is £{department.avg}</div>
          <br />
          <div className="d-flex flex-row">
            <div class="btn-group">
              <Button className="btn btn-success my-2" onClick={editDepartment}>
                Edit
              </Button>
            </div>
            <div class="btn-group">
              <Button className="mx-2 my-2" onClick={deleteDepartment}>
                Delete
              </Button>
            </div>
            <div>
              <p className="error">
                {error !== "" ? <p style={{ color: "red" }}>{error}</p> : ""}
              </p>
            </div>
          </div>
          <br />
          <div>
            <Link
              to={`/department/${id}/employee`}
              style={{ textDecoration: "none" }}
            >
              View all employees of this department
            </Link>
          </div>
        </Container>
      </div>
    );
  }
};
