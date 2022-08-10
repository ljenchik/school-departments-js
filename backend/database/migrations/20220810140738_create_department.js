/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
      .hasTable('user')
      .then(function (exists) {
          if (!exists) {
            return knex // **** udpate
                  .schema
                  .createTable('department', function (table) {
                    table.increments("id").primary();
                    table.string("name", 128).notNullable();
                    table.double("average_salary", 32).notNullable();
                  })
          }
      });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex, Promise) {
  return knex.schema.dropTable("department");
};