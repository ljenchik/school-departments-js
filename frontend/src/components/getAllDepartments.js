import React, { useEffect, useState } from "react";
import { getAllDepartments } from "../apiClient";
import { Link } from "react-router-dom";
import "./css/getAllDepartments.css";
import Container from "react-bootstrap/esm/Container";

export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then((response) => setDepartments(response));
  }, []);

  return (
    <Container>
        <h3 className="title">Departments</h3>
          {departments.map((department) => (
            <div key={department.id}>
              <Link to={`/department/${department.id}`} className='link'>
        {" "}
        {department.department_name}{" "}
      </Link>
            </div>
          ))}
        <br/>
        <Link to="/department/create"  className="add-link"> Add a new department </Link>
      </Container>
  );
};



