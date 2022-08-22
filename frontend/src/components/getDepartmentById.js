import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  getDepartmentById,
  deleteDepartmentById,
  getEmployeesByDepartmentId,
} from "../apiClient";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./css/getDepartmentById.css";
import Container from "react-bootstrap/esm/Container";
import { EmployeeTable } from "./employeeTable";

const styles = {
  customButton: {
    padding: "0px",
    textDecoration: "none",
  },
};

export const DepartmentInfo = () => {
  const params = useParams();
  const department_id = params.id;
  const navigate = useNavigate();
  const [department, setDepartment] = useState({});
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [displayTable, setDisplayTable] = useState(false);
  let props = {
    department: department,
    employees: employees,
  };

  useEffect(() => {
    getDepartmentById(department_id).then((response) =>
      setDepartment(response[0])
    );
    getEmployeesByDepartmentId(department_id).then((response) =>
      setEmployees(response)
    );
  }, []);

  const deleteDepartment = () => {
    deleteDepartmentById(department_id)
      .then((response) => {
          if (response.success === true) {
          setError(response.error);
          navigate("/department");
          }
          else {
            setError("You can't delete department with employees");
          }
        }
      )};

  const editDepartment = () => {
    getDepartmentById(department_id).then((response) =>
      navigate(`/department/${department_id}/edit`)
    );
  };

  const displayEmployees = () => {
    setDisplayTable(true);
  };

  if (department.avg === undefined && department.count === undefined) {
    return <div>Loading department ...</div>;
  } else {
    return (
      <div>
        <Container>
          <h4 className="title">{department.department_name}</h4>
          {/* <div>Head of department </div> <br /> */}
          <div >There are {department.count} members in this department</div>
          <br />
          <div>Average salary is £{department.avg.toFixed(2)}</div>
          <br />
          <div className="d-flex flex-row">
            <div>
              <Button className="btn btn-success my-2" onClick={editDepartment}>
                Edit
              </Button>
            </div>
            <div>
              <Button className="mx-2 my-2" onClick={deleteDepartment}>
                Delete
              </Button>
            </div>
            <div>
              <p className="error">
                <p style={{ color: "red" }}>{error}</p>
              </p>
            </div>
          </div>
          <br />

          

          <div>
            <Button
              variant="link"
              class="btn btn-link"
              style={styles.customButton}
              onClick={displayEmployees}
            >
              View all employees of {department.department_name}
            </Button>
          </div>

          <Link
            className="link_hover"
            to={`/department/${department_id}/employee/create`}
            style={{ textDecoration: "none" }}
          >
            Add employee to {department.department_name}
          </Link>

        <br/>
          {displayTable ? <EmployeeTable {...props} /> : ""}
        </Container>
      </div>
    );
  }
};
