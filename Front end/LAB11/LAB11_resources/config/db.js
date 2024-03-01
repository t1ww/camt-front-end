const mysql = require("mysql2");

let config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "todolist_db",
};

// Create a connection using the configuration
const connection = mysql.createConnection(config);

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Database is connected");
});

// Export the connection
module.exports = connection;