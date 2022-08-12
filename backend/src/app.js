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
    await deleteDepartmentById(id);
    res.sendStatus(200);
  });

  

  return app;
};

export default createApp;
