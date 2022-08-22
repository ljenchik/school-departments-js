
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";


export const EmployeeTable = ({department, employees}) => {
    
        if (employees === undefined) {
            return <div style={{color: "red"}}>Loading data ... </div>
        }
        if (employees.length === 0) {
            return <div style={{color: "red"}}>There are no employees in this department</div>
        }
        if (!Array.isArray(employees)) {
            return <div style={{color: "red"}}>There are no employees in this department</div>
        }
        return (
        <Container style={{"padding": "0px"}}>
        <h3 className="title">Employees of {department.department_name}</h3>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <th>Name</th>
            <th>Role</th>
            {/* <th>Date of birth</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Start date</th> */}
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <Link to={`/employee/${employee.id}`} className="employee-link">
                    {employee.name}
                  </Link>
                </td>
                <td>{employee.role}</td>
                {/* <td>{employee.dob}</td>
                <td>{employee.address}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>£{employee.salary}</td>
                <td>{employee.start_date}</td> */}
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </Container>
    );
}