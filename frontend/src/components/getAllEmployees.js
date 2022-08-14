import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../apiClient";
import { Link } from "react-router-dom";

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
              <Link
                to={`/employee/${employee.id}`}
                className="edit-report-link"
              >
                Name {employee.name}
              </Link><br/>
              Role {employee.role} <br/>
              Address {employee.address} <br/>
              Email {employee.email} <br/>
              Date of birth {employee.dob} <br/>
              Salary {employee.salary} <br/>
              Department {employee.department_id}
            <hr/><br/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
