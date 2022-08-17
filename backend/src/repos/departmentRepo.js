import { knex } from "./database";



export async function getAllDepartments() {
    return await knex("department")
    .orderBy('department.department_name')
  }

  export async function getDepartmentById(id) {
    return (await knex
    .raw('select d1.*, grp.count, grp.avg\
    from department d1 \
    join (\
      select d.id, count(e.id), AVG(e.salary) \
      from department d\
      left join employee e on e.department_id = d.id\
      where(d.id = ' + id + 
      ') group by d.id\
    ) grp on d1.id = grp.id')
    ).rows
  }

  export async function createDepartment(departmentName) {
    const id = await knex("department")
      .insert({
        department_name: departmentName,
      })
      .returning("id");
    return id[0].id;
  }
  export async function updateDepartmentName(id, department_name) {
    return await knex("department")
      .update({department_name})
      .where({id})
  }

  export async function deleteDepartmentById(id) {
    await knex('department')
    .where('department.id', id)
    .del()
  }