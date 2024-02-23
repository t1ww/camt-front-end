// write code here
const express = require("express");
const app = express();
// app.use(express.static("public"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const apiKey = "304ccaeedcdf5895b968e9f39fcee8ba";
const axios = require("axios");

// connect
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

// send html
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
// post
app.post("/", (req, res) => {
    var cityname = req.body.cityName;
    console.log("seeing " + cityname);
    res.setHeader("Content-type", "text/html");
    var lat, lon;
    // weather api
    axios({
        method: "get", //default
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`,
        responseType: "json", //default
    })
        .then((response) => {
            console.log("Showing weather data");

            var responseData = response.data;
            lat = responseData.coord.lat;
            lon = responseData.coord.lon;
            console.log(responseData);
            // writing multiple lines
            res.write(`<h1>The temperature in ${cityname} is ${Math.floor(responseData.main.temp)} degree celsius </h1>`);
            res.write(`<p>The weather currently is ${responseData.weather[0].description}</p>`);
            res.write(`<p>Coord : lat = ${responseData.coord.lat}, lon = ${responseData.coord.lon}</p>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${responseData.weather[0].icon}@2x.png" alt="">`);

            res.send();
        })
        .catch((error) => {
            console.log(error);
        });

    // pollution api
    axios({
        method: "get", //default
        url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid={API 
        key}`,
        responseType: "json", //default
    })
        .then((response) => {
            console.log("Showing pollution data");

            var responseData = response.data;
            console.log(responseData);
            // writing multiple lines
            res.write(``);
        })
        .catch((error) => {
            console.log(error);
        });
});
