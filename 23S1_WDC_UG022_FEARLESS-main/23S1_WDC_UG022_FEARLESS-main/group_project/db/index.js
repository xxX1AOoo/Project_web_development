const mysql = require("mysql");
const db=mysql.createPool({ host: 'localhost', database: 'FEARLESS'});
module.exports=db;
