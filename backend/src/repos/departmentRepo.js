import { knex } from "./database";

export async function createDepartment(departmentName) {
  const id = await knex("department")
    .insert({
      name: departmentName,
    })
    .returning("id");
  return id[0].id;
}

export async function getAllDepartments() {
    return await knex("department")
    .orderBy('department.id')
  }

  export async function getDepartmentById(id) {
    return await knex("department")
    .where('id', id)
  }

  export async function deleteDepartmentById(id) {
    await knex('department')
    .where('department.id', id)
    .del()
  }

  export async function updateDepartmentName(id, name) {
    return await knex("department")
      .update({name})
      .where({id})
  }
