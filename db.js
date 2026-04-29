const mysql = require('mysql2');

//create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'student',
    database: 'mysql' //CHANGE TO NEW DB NAME
})

connection.query(
    `SELECT * FROM 'user'`,
    function(err, results, fields){
        console.log(results);
        console.log(fields);
    }
);