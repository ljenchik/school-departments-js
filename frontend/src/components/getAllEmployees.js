import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../apiClient";

export const GetAllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response));
  }, []);
  console.log(employees);
  return (
    <div>
      <div className="container">
        <h3 className="my-4 mt-3">Employees of </h3>
        <div className="row">
          {employees.map((employee) => (
            <div  className="col-md-3" key={employee.id}>
              {employee.name}
              {employee.role}
              {employee.address}
              {employee.dob}
              {employee.department_id}
            <hr/><br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
