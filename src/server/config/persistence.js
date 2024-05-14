const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

function connectToDatabase() {
  // create a new MySQL connection using environment variables
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.SRV_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  return connection;
}

const connection = connectToDatabase();
module.exports = connection;