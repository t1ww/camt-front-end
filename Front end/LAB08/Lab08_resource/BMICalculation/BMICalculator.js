// write code here
const express = require('express');
const app = express(); 
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, function() {
    console.log("server listening to port 3000");
});
// connect to html
app.get("/", function(request,response){
    response.sendFile(__dirname + "/index.html");
});

app.post("/", function (req,res) {
    var weight = Number(req.body.weight), height = Number(req.body.height);
    var BMI = (weight) / (height * height)
    res.send("The result of the calculation is " + BMI.toString());
});
