// write code here
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mysql = require("mysql2");
app.use(express.static("public"));
const database = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "book_management",
});

// connect
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// send html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "public" + "index.html");
});

// inserting book
app.post("/books/add", (req, res) => {
    const { bookName } = req.body;
    database.execute("INSERT INTO books (BookName) VALUES (?)", [bookName], (error, results) => {
        if (error) { // error check
            console.error("Error inserting into the database: ", error);
            return res.status(500).send("Internal Server Error");
        }
        console.log("Inserted book into database, see result : ", results);
        res.redirect("/");
    });
});

// select book
app.get("/books", (req, res) => {
    database.query("SELECT * FROM books", (err, rows) => {
        if (err) {
            console.error("Error fetching books from the database: ", err);
            return res.status(500).send("Internal Server Error");
        }
        console.log("Retrieved books from database : ", rows);
        res.json(rows);
    });
});