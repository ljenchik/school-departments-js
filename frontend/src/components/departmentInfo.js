import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDepartmentById, deleteDepartmentById } from "../apiClient";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

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
      .then((response) => navigate("/department"))
      .catch((err) => {
        setError(err);
      });
  };

  const editDepartment = () => {
    getDepartmentById(id).then((response) => navigate(`/department/${id}/edit`));
  };

  if (department === undefined) {
    return <div>Loading department ...</div>;
  } else {
    return (
      <div>
        <div>{department.name}</div>
        <Button className="btn btn-success my-2" onClick={editDepartment}>
          Edit
        </Button>
        <Button className="mx-2 my-2" onClick={deleteDepartment}>
          Delete
        </Button>
        <Link to="/department" className="Link">
          {" "}
          View all departments{" "}
        </Link>
      </div>
    );
  }
};
