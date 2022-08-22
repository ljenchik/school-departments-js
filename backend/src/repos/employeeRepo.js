import { knex } from "./database";

export async function getAllEmployees() {
  return (await knex
    .raw('select e.*, d.department_name from employee e\
    join department d on e.department_id=d.id')
  ).rows
  }

export async function getEmployeesByDepartmentId(id) {
  return (await knex
    .raw('select e.*, d.department_name from employee e\
    join department d on d.id=e.department_id\
    where e.department_id= ' + id)
  ).rows
  }

export async function getEmployeeById(id) {
  return (await knex
  .raw('select e.*, d.department_name from employee e\
  join department d on d.id=e.department_id\
  where e.id= ' + id)
).rows
}
    
export async function createEmployee(department_id, employee) {
    const id = await knex("employee")
      .insert({
        name: employee.name,
        role: employee.role,
        dob: employee.dob,
        address: employee.address,
        phone: employee.phone,
        email: employee.email,
        start_date: employee.start_date,
        salary: employee.salary,
        department_id: department_id
      })
      .returning("id");
    return id[0].id;
  }

  export async function updateEmployee(id, name, role, dob, address, phone, email, salary, start_date) {
    return await knex("employee")
      .update({name, role, dob, address, phone, email, salary, start_date})
       .where({id})
  }

  export async function deleteEmployeeById(id) {
    await knex('employee')
    .where('id', id)
    .del()
  }