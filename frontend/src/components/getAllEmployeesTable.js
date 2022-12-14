import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import "./css/getAllEmployeesTable.css";


export const GetAllEmployeesTable = ({employees}) => {
    
        if (employees === undefined) {
            return <div style={{color: "red"}}>Loading data ... </div>
        }
        if (employees.length === 0) {
            return <div style={{color: "red"}}>There are no employees</div>
        }
        if (!Array.isArray(employees)) {
            return <div style={{color: "red"}}>There are no employees</div>
        }
        return (
        <Container>
        <ReactBootStrap.Table striped bordered hover>
          <thead>
            <th>Name</th>
            <th>Department</th>
            <th>Role</th>
           
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <Link to={`/employee/${employee.id}`} className="link">
                    {employee.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/department/${employee.department_id}`} className="link">
                  {employee.department_name}
                  </Link>
                </td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </ReactBootStrap.Table>
      </Container>
    );
}