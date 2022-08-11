const baseurl = process.env["REACT_APP_BACKEND_DOMAIN"];

export async function createReport(department) {
  const response = await fetch(`${baseurl}/department/create`, {
    method: "POST",
    body: JSON.stringify(newReport),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!data.success) {
    return { error: data.message, id: "", success: false };
  } else {
    return { error: "", id: data.reportId, success: true };
  }
}

export async function getAllDepartments() {
  const response = await fetch(`${baseurl}/department`);
  return await response.json();
}

export async function getDepartmentById(id) {
    const response = await fetch(`${baseurl}/department/${id}`);
    return await response.json();
  }
