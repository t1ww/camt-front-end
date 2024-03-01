const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/db");
const listItem = require("./model/listItem");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
});

// student's code here // >
app.get("/", async (req, res) => {
    try {
        const items = await listItem.getTodoItemsName();

        // Render the view with the provided data
        res.render("list", {
            listTitle: "Today",
            newListItems: items,
        });

        //inserting new item
        const newitem = {
            name: "SE262!",
        };
        listItem.create(newitem);
        
        // Define and fetch items asynchronously
        await listItem.defineInitialItems();

        // Handle the items as needed
        console.log(items);
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});


