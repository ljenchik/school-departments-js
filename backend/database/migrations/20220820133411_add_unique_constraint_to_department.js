/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema.table('department', function(table) {
        table.unique('department_name');
    })
};
    
    /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
    exports.down = function(knex) {
    return knex.schema.dropUnique('department_name');
    };
    