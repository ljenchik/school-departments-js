const environment = process.env.ENVIRONMENT || "development";
const config = require("../../database/knexfile.js")[environment];
export const knex = require("knex")(config);