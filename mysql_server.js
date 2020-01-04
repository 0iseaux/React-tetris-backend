const mysql = require('mysql');

const connDB = mysql.createConnection({
    host: 'localhost',
    user: 'player',
    password: '',
    database: 'scores',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
});

connDB.connect(function(err) {
    if (err) console.error(err);
    console.log(`Connected to MySQL server as 'Player'!`);
});

module.exports = connDB;
