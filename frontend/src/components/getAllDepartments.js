import React, { useEffect, useState } from "react";
import { getAllDepartments } from "../apiClient";
import { Link } from "react-router-dom";


export const GetAllDepartments = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getAllDepartments().then((response) => setDepartments(response));
  }, []);

  return (
    <div>
      <div className="container">
        <h3 className="my-4 mt-3">Departments</h3>
        <div className="row">
          {departments.map((department) => (
            <div  className="col-md-3" key={department.id}>
              <Link to={`/department/${department.id}`} className="link">
        {" "}
        {department.name}{" "}
      </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



