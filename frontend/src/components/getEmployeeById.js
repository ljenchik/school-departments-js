import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../apiClient";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { deleteEmployeeById } from "../apiClient";

export const GetEmployeeById = () => {
  const [employee, setEmployee] = useState([]);
  const params = useParams();
  const employee_id = params.id;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployeeById(employee_id).then((response) => setEmployee(response[0]));
  }, []);

  const deleteEmployee = () => {
    deleteEmployeeById(employee_id)
      .then((response) => navigate(`/department/${employee.department_id}`))
      .catch((err) => {
        setError(err);
      });
  };

  const editEmployee = () => {
    getEmployeeById(employee_id).then((response) => navigate(`/employee/${employee_id}/edit`));
  };

  if (employee === undefined) {
    return <div>Loading report ...</div>;
  } else {
  return (
    <div>
        <h3 className="my-4 mt-3">Employee</h3>
              Name {employee.name} <br/>
              Role {employee.role}<br/>
              Address {employee.address}<br/>
              Phone {employee.phone}<br/>
              Email {employee.email}<br/>
              Date of birth {employee.dob}<br/>
              Salary {employee.salary}<br/>
              Start date {employee.start_date}<br/>
              Department {employee.department_id}
     
      <Button className="btn btn-success my-2" onClick={editEmployee}>
      Edit
    </Button>
    <Button className="mx-2 my-2" onClick={deleteEmployee}>
      Delete
    </Button>
     <Link to="/employee" className="Link">
     {" "}
     View all employees{" "}
   </Link>
   <Link to="/department" className="Link">
     {" "}
     View all departments{" "}
   </Link>
   </div> 
  );
};
}
