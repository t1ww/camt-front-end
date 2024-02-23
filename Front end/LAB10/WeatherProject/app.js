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
            res.write(`<h1>The temperature in ${cityname} is ${responseData.main.temp} degree celsius </h1>`);
            res.write(`<p>The weather currently is ${responseData.weather[0].description}</p>`);
            res.write(`<p>Coord : lat = ${Math.floor(lat)}, lon = ${Math.floor(lon)}</p>`);
            res.write(`<img src="http://openweathermap.org/img/wn/${responseData.weather[0].icon}@2x.png" alt="">`);

            // pollution api
            console.log("Showing pollution data");
            axios({
                method: "get", //default
                url: `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
                responseType: "json", //default
            })
                .then((response) => {
                    var pollutionData = response.data.list[0];
                    console.log(pollutionData);
                    res.write(`<h1>The Quality of pollution in ${cityname} is ${pollutionData.main.aqi}</h1>`);
                    res.write(`<p>pm2.5 is ${pollutionData.components.pm2_5}</p>`);
                    res.write(`<p>pm10  is ${pollutionData.components.pm10}</p>`);

                    // send
                    res.send();
                })
                .catch((error) => {
                    console.log(error.toString());
                });
        })
        .catch((error) => {
            console.log(error);
        });
});
