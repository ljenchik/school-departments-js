import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateDepartment } from './components/createDepartment';
import { Home } from './components/homePage';
import { GetAllDepartments } from './components/getAllDepartments'; 
import { DepartmentInfo } from './components/getDepartmentById';
import { EditDepartment } from './components/editDepartment';
import { CreateEmployee } from './components/createEmployee';
import { GetEmployeesByDepartmentId } from './components/getEmployeesByDepartmentId';
import { GetAllEmployees } from './components/getAllEmployees';
import { GetEmployeeById } from './components/getEmployeeById';
import { EditEmployee } from './components/editEmployee';
import { Navbar1 } from './components/navbar';
import { HomePage } from './components/home';

const Paths = () => {
  return (
    <Routes>
      <Route exact path="/department/create" element={<CreateDepartment />}></Route>
      <Route exact path="/" element={<HomePage />}></Route>
      <Route exact path="/department" element={<GetAllDepartments />}></Route>
      <Route exact path="/department/:id" element={<DepartmentInfo />}></Route>
      <Route exact path="/department/:id/edit" element={<EditDepartment />}></Route>
      <Route exact path="/department/:id/employee/create" element={<CreateEmployee/>} > </Route>
      <Route exact path="/employee/:id/edit" element={<EditEmployee/>} > </Route>
      {/* <Route exact path="/department/:id/employee" element={<GetEmployeesByDepartmentId />}></Route> */}
      <Route exact path="/employee" element={<GetAllEmployees />}></Route>
      <Route exact path="/employee/:id" element={<GetEmployeeById />}></Route>
    </Routes>
  );
};


const App = () => {
  return (
    <Router>
      <Navbar1 />
      <main>
        <Paths />
      </main>
    </Router>
  );
};

export default App;


