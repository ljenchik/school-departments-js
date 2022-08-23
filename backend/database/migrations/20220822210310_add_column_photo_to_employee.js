/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.up = function(knex) {
    return knex.schema.table('employee', function(table) {
        table.string('photo');
    })
};
    
    /**
    * @param { import("knex").Knex } knex
    * @returns { Promise<void> }
    */
    exports.down = function(knex) {
    return knex.schema.table ('employee', table => {
        table.dropColumn('photo');
    })
    };
    