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
    const department = await getDepartmentById(id);
    return res.json(department);
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
    const employees = await getEmployeestByDepartmentId(id);
    if (employees.length === 0) {
      await deleteDepartmentById(id);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });

  app.get("/employee", async (req, res) => {
    const employees = await getAllEmployees();
    return res.json(employees);
  });

  app.get("/department/:id(\\d+)/employee", async (req, res) => {
    var id = req.params.id;
    const employee = await getEmployeesByDepartmentId(id);
    return res.json(employee);
  });

  app.get("/employee/:id(\\d+)", async (req, res) => {
    var id = req.params.id;
    const employee = await getEmployeeById(id);
    return res.json(employee);
  });

  app.post("/department/:id/employee/create", async (req, res) => {
    const requestBody = req.body;
    var id = req.params.id;
    const employeetId = await createEmployee(id, requestBody);
    return res.json({
      success: true,
      employee_id: employeetId,
      department_id: id
    });
  });

  app.put("/employee/:id(\\d+)/edit", async (req, res) => {
    var id = req.params.id;
    const requestBody = req.body;
    await updateEmployee(id, requestBody.name);
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
