import React, { useEffect, useState } from "react";
import { getAllEmployees } from "../apiClient";
import { Link } from "react-router-dom";
import { GetAllEmployeesTable } from "./getAllEmployeesTable";

export const GetAllEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((response) => setEmployees(response));
  }, []);
  console.log(employees);
  return (
    <div>
      <div className="container">
        <h3 className="my-4 mt-3">Employees</h3>
        <GetAllEmployeesTable employees={employees}/>
      </div>
    </div>
  );
};
