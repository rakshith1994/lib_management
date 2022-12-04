import mysql from 'mysql';
import * as dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
  connectionLimit : process.env.DB_CONN_LIMIT,
  host            : process.env.DB_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME,
  port            : process.env.DB_PORT_NO
})

export default pool;