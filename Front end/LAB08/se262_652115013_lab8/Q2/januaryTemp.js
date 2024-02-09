// Include the nodejs File system into your program
// write code here
const express = require('express');
const app = express();
const fileSystem = require('fs');

app.listen(3000, function () {
    console.log("server listening to port 3000");
    fileSystem.writeFile("sfjanaverages.txt", january,
        {
            encoding: "utf8",
            flag: "w",
            mode: 0o666
        },
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully\n");
                console.log("The written has the following contents:");
                var str = fileSystem.readFileSync("sfjanaverages.txt", "utf8");
                console.log(str);
                console.log("Start to read file");
                var array = str.split("\n");
                var day = 1;
                for (let index = 0; index < array.length-1; index++, day++) {
                    const element = array[index];
                    var valuesArray = element.split(",");
                    var dayString = "Day " + day.toString();
                    dayString += "\nMean:" + valuesArray[0].toString();
                    dayString += "\nLow:" + valuesArray[1].toString();
                    dayString += "\nHigh:" + valuesArray[2].toString();
                    
                    dayString += "\n-----------------"
                    console.log(dayString);
                }
            }
        }
    );
});


var january = "48,42,68\n";
january += "48,42,69\n";
january += "49,42,69\n";
january += "49,42,61\n";
january += "49,42,65\n";
january += "49,42,62\n";
january += "49,42,62\n";

