/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema
    .createTable('department', function (table) {
    table.increments('id').primary();
    table.string('name', 128).notNullable();
    })
    };
    
    /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
    exports.down = function(knex) {
    return knex.schema.dropTable('department');
    };
    
    