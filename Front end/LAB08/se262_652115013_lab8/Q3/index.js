// write code here
const express = require('express');
const app = express();
const fileSystem = require('fs');

// listen
app.listen(3000, function() {
    console.log("server listening to port 3000");
});

app.get("/", function(req,res){
    var str = fileSystem.readFileSync("counter.txt", "utf8");
    res.send("<h1>There has been " + str + " hits to this page</h1>");
    fileSystem.writeFileSync("counter.txt",(Number(str)+1).toString());
})
