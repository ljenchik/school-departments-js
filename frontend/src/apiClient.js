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
    } else {
      const error = await response.text();
      return { success: false, id: "", error: error };
    }
  } catch (e) {
    return { success: false, id: "", error: e };
  }
}

export async function editDepartment(id, updatedDepartment) {
  try {
    const response = await fetch(`${baseurl}/department/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(updatedDepartment),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        return { success: false, error: data.message };
      } else {
        return { success: true, error: "" };
      }
    } else {
      const error = await response.text();
      return { success: false, error: error };
    }
  } catch (e) {
    return { success: false, error: e };
  }
}

export async function deleteDepartmentById(id) {
  try {
    const response = await fetch(`${baseurl}/department/${id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return { success: true, error: "" };
    } else {
      const error = await response.text();
      return { success: false, error: error };
    }
  } catch (e) {
    return { success: false, error: e };
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
  try {
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
    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        return {
          success: false,
          error: data.error,
          department_id: "",
          employee_id: "",
        };
      } else {
        return {
          success: true,
          error: "",
          department_id: data.department_id,
          employee_id: data.employee_id,
        };
      }
    } else {
      const error = await response.text();
      return { success: false, id: "", error: error };
    }
  } catch (e) {
    return { success: false, id: "", error: e };
  }
}

export async function editEmployee(id, updatedEmployee) {
  try {
    const response = await fetch(`${baseurl}/employee/${id}/edit`, {
      method: "PUT",
      body: JSON.stringify(updatedEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (!data.success) {
        return {
          success: false,
          error: data.error,
        };
      } else {
        return {
          success: true,
          error: "",
        };
      }
    } else {
      const error = await response.text();
      return { success: false, id: "", error: error };
    }
  } catch (e) {
    return { success: false, id: "", error: e };
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
