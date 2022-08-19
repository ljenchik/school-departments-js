const baseurl = process.env["REACT_APP_BACKEND_DOMAIN"];

export async function getAllDepartments() {
  const response = await fetch(`${baseurl}/department`);
  return await response.json();
}

export async function getDepartmentById(id) {
  const response = await fetch(`${baseurl}/department/${id}`);
  return await response.json();
}

export async function createDepartment(department) {
  try {
    const response = await fetch(`${baseurl}/department/create`, {
      method: "POST",
      body: JSON.stringify(department),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        return { error: data.message, id: "", success: false };
      } else {
        return { success: true, id: data.department_id, error: "" };
      }
    }
    else {
      const error = await response.text();
      console.log(error);
      return { success: false, id: "", error: error };
    }
    
  } catch (e) {
    return { success: false, id: "", error: e };
  }
}

export async function editDepartment(id, updatedDepartment) {
  const response = await fetch(`${baseurl}/department/${id}/edit`, {
    method: "PUT",
    body: JSON.stringify(updatedDepartment),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.success) {
    return { error: data.message, success: false };
  } else {
    return { error: "", success: true };
  }
}

export async function deleteDepartmentById(id) {
  const response = await fetch(`${baseurl}/department/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw "You can't delete department with employees";
  }
}

export async function getAllEmployees() {
  const response = await fetch(`${baseurl}/employee`);
  return await response.json();
}

export async function getEmployeeById(id) {
  const response = await fetch(`${baseurl}/employee/${id}`);
  return await response.json();
}

export async function getEmployeesByDepartmentId(id) {
  const response = await fetch(`${baseurl}/department/${id}/employee`);
  return await response.json();
}

export async function createEmployee(department_id, employee) {
  const response = await fetch(
    `${baseurl}/department/${department_id}/employee/create`,
    {
      method: "POST",
      body: JSON.stringify(employee),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!data.success) {
    return {
      error: data.message,
      employee_id: "",
      department_id: "",
      success: false,
    };
  } else {
    return {
      error: "",
      department_id: data.department_id,
      employee_id: data.employee_id,
      success: true,
    };
  }
}

export async function editEmployee(id, updatedEmployee) {
  const response = await fetch(`${baseurl}/employee/${id}/edit`, {
    method: "PUT",
    body: JSON.stringify(updatedEmployee),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.success) {
    return { error: data.message, success: false };
  } else {
    return { error: "", success: true };
  }
}

export async function deleteEmployeeById(id) {
  const response = await fetch(`${baseurl}/employee/${id}/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status !== 200) {
    throw "Error deleting. Response status code: " + response.status;
  }
}
