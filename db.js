import mysql from "mysql";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "delivery_service",
});

export default db;
