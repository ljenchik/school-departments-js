import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getDepartmentById } from "../apiClient";

export const DepartmentInfo = () => {
  const params = useParams();
  const id = params.id;
  const [department, setDepartment] = useState({});

  useEffect(() => {
    getDepartmentById(id).then((response) => setDepartment(response[0]));
  }, []);

  if (department === undefined) {
    return <div>Loading department ...</div>;
  } else {
    return <div>{department.name}</div>;
  }
};
