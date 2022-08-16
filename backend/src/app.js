import express from "express";
import { json } from "body-parser";
import cors from "cors";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartmentName,
  deleteDepartmentById,
} from "./repos/departmentRepo";
import {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByDepartmentId,
  createEmployee,
  updateEmployee,
  deleteEmployeeById,
} from "./repos/employeeRepo";

const createApp = () => {
  const app = express();
  app.use(json());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/department", async (req, res) => {
    const departments = await getAllDepartments();
    return res.json(departments);
  });

  app.get("/department/:id(\\d+)", async (req, res) => {
    var id = req.params.id;
    try {
      const department = await getDepartmentById(id);
      if (department !== undefined) {
        if (department[0].avg === null) {
          department[0].avg = 0;
        }
        if (department[0].count === "0") {
          department[0].count = 0;
        }
        return res.json(department);
      }
    } catch (err) {
      console.log(err.message);
    }
  });

  app.post("/department/create", async (req, res) => {
    const requestBody = req.body;
    const departmentId = await createDepartment(requestBody.name);
    return res.json({ success: true, id: departmentId });
  });

  app.put("/department/:id(\\d+)/edit", async (req, res) => {
    var id = req.params.id;
    const requestBody = req.body;
    await updateDepartmentName(id, requestBody.name);
    return res.json({ success: true });
  });

  app.delete("/department/:id(\\d+)/delete", async (req, res) => {
    var id = req.params.id;
    try {
      const response = await getDepartmentById(id);
      if (!response) {
        throw new Error("This department doesn't exist");
      } else {
        try {
          if (response[0].count !== '0') {
            throw new Error("Impossible to delete department with employees");
          } else {
            await deleteDepartmentById(id);
            res.sendStatus(200);
            // return res.json({
            //   status: 200,
            //   error: ""
            // })
          }
        } catch (err) {
          res.sendStatus(500);
      // return res.json({
      //   status: 500,
      //   error: "Impossible to delete department with employees"
      // })
        }
      }
    } catch (e) {
      res.sendStatus(404);
      // return res.json({
      //   status: 500,
      //   error: "This department doesn't exist"
      // })
    }
  });

  app.get("/employee", async (req, res) => {
    const employees = await getAllEmployees();
    for (var i = 0; i < employees.length; i++) {
      employees[i].dob = employees[i].dob
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
      employees[i].start_date = employees[i].start_date
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
    }
    return res.json(employees);
  });

  app.get("/department/:id(\\d+)/employee", async (req, res) => {
    var id = req.params.id;
    const employees = await getEmployeesByDepartmentId(id);
    for (var i = 0; i < employees.length; i++) {
      employees[i].dob = employees[i].dob
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
      employees[i].start_date = employees[i].start_date
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-");
    }
    return res.json(employees);
  });

  app.get("/employee/:id(\\d+)", async (req, res) => {
    var id = req.params.id;
    var employee = await getEmployeeById(id);
    employee[0].dob = employee[0].dob
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");
    employee[0].start_date = employee[0].start_date
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");
    return res.json(employee);
  });

  app.post("/department/:id/employee/create", async (req, res) => {
    const requestBody = req.body;
    var id = req.params.id;
    const employeetId = await createEmployee(id, requestBody);
    return res.json({
      success: true,
      employee_id: employeetId,
      department_id: id,
    });
  });

  app.put("/employee/:id(\\d+)/edit", async (req, res) => {
    var id = req.params.id;
    const requestBody = req.body;
    await updateEmployee(
      id,
      requestBody.name,
      requestBody.role,
      requestBody.dob,
      requestBody.address,
      requestBody.phone,
      requestBody.email,
      requestBody.salary,
      requestBody.start_date
    );
    return res.json({ success: true });
  });

  app.delete("/employee/:id(\\d+)/delete", async (req, res) => {
    var id = req.params.id;
    await deleteEmployeeById(id);
    res.sendStatus(200);
  });

  return app;
};

export default createApp;
