export function createEmployeeRequestValidation(request) {
  if (!request) {
    return { success: false, error: "Empty request" };
  }
  let errorMessage = "Empty "
  if (request.name === "" || request.name === null || request.name === undefined) {
    errorMessage += "name, " 
  }
  if (request.role === "" || request.role === null || request.role === undefined) {
    errorMessage += "role, " 
  }
  if (request.address === "" || request.address === null || request.address === undefined) {
    errorMessage += "address, " 
  }
  if (request.email === "" || request.email === null || request.email === undefined) {
    errorMessage += "email, " 
  }
  if (request.phone === "" || request.phone === null || request.phone === undefined) {
    errorMessage += "phone, " 
  }
  if (request.slary === "" || request.salary === null || request.salary === undefined) {
    errorMessage += "salary" 
  }
  if (errorMessage ===  "Empty ") {
    return { success: true, error: ""}
  }
  else 
    {return { success: false, error: errorMessage}}

}
