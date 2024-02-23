const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const { email, firstName, lastName } = req.body;

    // Configuration object for Axios
    const config = {
        url: "https://us18.api.mailchimp.com/3.0/",
        method: "post",
        auth: {
            username: "nongtews@gmail.com",
            password: "3315711f4ec01b7b3e48067ff39cd324-us18",
        },
        data: {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
        },
    };

    // Make a POST request to Mailchimp API
    axios(config)
        .then((response) => {
            console.log(response.data);
            console.log(response.status);
            if (response.status === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })
        .catch((error) => {
            console.error("Axios error:", error);
            res.sendFile(__dirname + "/failure.html");
        });
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
