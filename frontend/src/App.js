import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateDepartment } from './components/createDepartment';
import { Home } from './components/homePage';
import { GetAllDepartments } from './components/getAllDepartments'; 
import { DepartmentInfo } from './components/departmentInfo';
import { EditDepartment } from './components/editDepartment';

const Paths = () => {
  return (
    <Routes>
      <Route exact path="/department/create" element={<CreateDepartment />}></Route>
      <Route exact path="/" element={<Home />}></Route>
      <Route exact path="/department" element={<GetAllDepartments />}></Route>
      <Route exact path="/department/:id" element={<DepartmentInfo />}></Route>
      <Route exact path="/department/:id/edit" element={<EditDepartment />}></Route>
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <main>
        <Paths />
      </main>
    </Router>
  );
};

export default App;


