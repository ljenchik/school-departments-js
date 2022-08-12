/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema
    .createTable('employee', function (table) {
    table.increments('id').primary();
    table.string('name', 128).notNullable();
    table.string('role', 64).notNullable();
    table.date('dob').notNullable();
    table.string('address', 128).notNullable();
    table.string('email', 64).notNullable();
    table.date('start_date').notNullable();
    table.integer('department_id').notNullable();
    
    table.foreign('department_id').references('id').inTable('department');
    })
    };
    
    /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
    exports.down = function(knex) {
    return knex.schema.dropTable('employee');
    };