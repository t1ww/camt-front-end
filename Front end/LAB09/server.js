// write code here
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { createConnection } = require("mysql2");
const conn = createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database: "mysql",
    password: "",
});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
    console.log("server listening to port 3000");
});
// connect to html
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.post("/books/add", function (req, res) {
    // do someting here
    let bname = req.body.bookName.id;
    console.log(bname);
});
