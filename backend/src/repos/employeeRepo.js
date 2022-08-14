import { knex } from "./database";

export async function getAllEmployees() {
    return await knex("employee")
    .orderBy('employee.name')
  }

export async function getEmployeesByDepartmentId(id) {
    return await knex("employee")
    .where('department_id', id)
}

export async function getEmployeeById(id) {
    return await knex("employee")
    .where('id', id)
}

export async function createEmployee(department_id, employee) {
    const id = await knex("employee")
      .insert({
        name: employee.name,
        role: employee.role,
        dob: employee.dob,
        address: employee.address,
        email: employee.email,
        start_date: employee.start_date,
        salary: employee.salary,
        department_id: department_id
      })
      .returning("id");
    return id[0].id;
  }

  export async function updateEmployee(id, employee) {
    return await knex("employee")
      //.update({employee})
      .where({id})
  }

  export async function deleteEmployeeById(id) {
    await knex('employee')
    .where('id', id)
    .del()
  }