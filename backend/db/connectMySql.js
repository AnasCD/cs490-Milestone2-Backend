// connectMySql.js
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:'10651992A',
    database: 'milestone2'
});

db.connect(err => {
    if(err){
        console.error("Error connecting to MySql:", err);
        return;
    }
    console.log('Connected to MySql');
});


export default db;
