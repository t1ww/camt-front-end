// write code here
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const FS = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
// listening to port 3000
app.listen(3000, function () {
    console.log("server listening to port 3000");
});
// connect to html
app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
// submit
app.post("/", function (req, res) {
    var f_name = req.body.first_name;
    var l_name = req.body.last_name;
    if (f_name == "" || l_name == "") {
        // alert for name
        res.send("please fill both name and surname");
    } else {
        var full_name = f_name + "," + l_name + "\n";
        // file reading
        FS.appendFile("guest.txt",full_name,function(){});
        // send to thankyou
        res.sendFile(__dirname + "/thankyou.html");
    }
});

// guest book
app.get('/guestbook', (req, res) => {
    FS.readFile('guest.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('An error occurred while reading from the file:', err);
            res.send('An error occurred while reading the guest book.');
        } else {
            res.setHeader('Content-Type', 'text/html');
            const entries = data.split('\n').filter(line => line.trim() !== '');
            const formattedEntries = entries.map((entry, index) => {
                const [firstName, lastName] = entry.split(',');
                return `<p>No: ${index + 1}<br>First name: ${firstName}<br>Last name: ${lastName}</p>`;
            }).join('');
            res.write(`<h1>The number of guests is ${entries.length}.</h1>`);
            res.end(formattedEntries);
        }
    });
});
