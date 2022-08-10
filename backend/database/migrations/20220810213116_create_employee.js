/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema
        .hasTable('employee')
        .then(function (exists) {
            if (!exists) {
              return knex // **** udpate
                    .schema
                    .createTable('employee', function (table) {
                      table.increments("id").primary();
                      table.string("name", 128).notNullable();
                      table.date("date").notNullable();
                      table.string("role", 128).notNullable();
                      table.double("salary", 128).notNullable();
                      table.string("address", 128).notNullable();
                      table.string("email", 128).notNullable();
                      table.integer("department_id");
                      table.foreign("department_id").references("id").inTable("department");
                    })
            }
        });
  };
  
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable("employee");
  };