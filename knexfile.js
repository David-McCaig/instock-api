require('dotenv').config();

const {
  DB_LOCAL_DBNAME,
  DB_LOCAL_USER,
  DB_LOCAL_PASSWORD
} = process.env;
console.log(DB_LOCAL_USER+" "+DB_LOCAL_PASSWORD+" "+DB_LOCAL_DBNAME)
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: DB_LOCAL_USER,
    password: DB_LOCAL_PASSWORD,
    database: DB_LOCAL_DBNAME,
    charset: "utf8"
}

};
