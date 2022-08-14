import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../apiClient";
import { useParams } from "react-router-dom";

export const GetEmployeeById = () => {
  const [employee, setEmployee] = useState([]);
  const params = useParams();
  const employee_id = params.id;

  useEffect(() => {
    getEmployeeById(employee_id).then((response) => setEmployee(response[0]));
  }, []);
  console.log(employee);
  return (
    <div>
        <h3 className="my-4 mt-3">Employee</h3>
              {employee.name}
              {employee.role}
              {employee.address}
              {employee.dob}
              {employee.department_id}
        <hr />
        <br />
      </div>
  );
};
