import React, { useEffect, useState } from "react";
import { getEmployeesByDepartmentId } from "../apiClient";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const GetEmployeesByDepartmentId = (id) => {
  const [employees, setEmployees] = useState([]);
  const params = useParams();
  const department_id = params.id;

  useEffect(() => {
    getEmployeesByDepartmentId(department_id).then((response) =>
      setEmployees(response)
    );
  }, []);
  console.log(employees);
  return (
    <div>
      <div className="container">
        <h3 className="my-4 mt-3">Employees of </h3>
        <div className="row">
          {employees.map((employee) => (
            <div className="col-md-3" key={employee.id}>
              <Link
                to={`/employee/${employee.id}`}
                className="edit-report-link"
              >
                Name {employee.name}
              </Link><br/>
              Role {employee.role}<br/>
              Address {employee.address}<br/>
              Email {employee.email}<br/>
              Date of birth {employee.dob}<br/>
              Salary {employee.salary}
              <hr />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
