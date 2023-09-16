import mysql from "mysql2";

const db=mysql.createConnection
(
    {
        host:"localhost",
        user:"root",
        password:"password",
        database:"audioplayerdb"
    }
);

export default db;