require('dotenv').config();

const {
  USER,
  PASSWORD,
  DATABASE
} = process.env;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  client: "mysql",

  connection: {
    host: '127.0.0.1',
    user: USER,
    password: PASSWORD,
    database: DATABASE,
    charset: "utf8"
}

};
