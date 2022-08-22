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
import { createEmployeeRequestValidation } from "./createEmployeeRequestValidation";

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
      res.status(500);
      return res.send(e.toString());
    }
  });

  app.post("/department/create", async (req, res) => {
    const requestBody = req.body;
    try {
      const departmentId = await createDepartment(requestBody.name);
      return res.json({ success: true, id: departmentId, error: "" });
    } catch (e) {
      res.status(500);
      return res.send(e.toString());
    }
  });

  app.put("/department/:id(\\d+)/edit", async (req, res) => {
    var id = req.params.id;
    const requestBody = req.body;
    try {
      await updateDepartmentName(id, requestBody.name);
      return res.json({ success: true, error: "" });
    } catch (e) {
      res.status(500);
      return res.send(e.toString());
    }
  });

  app.delete("/department/:id(\\d+)/delete", async (req, res) => {
    var id = req.params.id;
    try {
      const response = await getDepartmentById(id);
        if (response[0].count === "0") {
          try {
            await deleteDepartmentById(id);
            return res.json({ success: true, error: "" });
          } catch (e) {
            res.status(500);
            return res.send(e.toString());
          }
        } else {
          res.status(500);
          return res.json({
            success: false,
            error: "You can't delete department with employees",
          });
      }
    } catch (err) {
      res.status(500);
      return res.send(e.toString());
    }
  });

  app.get("/employee", async (req, res) => {
    const employees = await getAllEmployees();
    // for (var i = 0; i < employees.length; i++) {
    //   employees[i].dob = employees[i].dob
    //     .toLocaleDateString()
    //     .split("/")
    //     .reverse()
    //     .join("-");
    //   employees[i].start_date = employees[i].start_date
    //     .toLocaleDateString()
    //     .split("/")
    //     .reverse()
    //     .join("-");
    // }
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
    var department_id = req.params.id;

    const validationResult = createEmployeeRequestValidation(requestBody);

    if (!validationResult.success) {
      return res.json(validationResult);
    } else {
      const employeeId = await createEmployee(department_id, requestBody);
      return res.json({
        success: true,
        employee_id: employeeId,
        department_id: department_id,
      });
    }
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
