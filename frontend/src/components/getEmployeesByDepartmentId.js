import React, { useEffect, useState } from "react";
import { getEmployeesByDepartmentId } from "../apiClient";
import { useParams } from 'react-router-dom';

export const GetEmployeesByDepartmentId = (id) => {
  const [employees, setEmployees] = useState([]);
  const params = useParams(); 
  const department_id = params.id;

  useEffect(() => {
    getEmployeesByDepartmentId(department_id).then((response) => setEmployees(response));
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
            <hr/><br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
