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
        const items = await listItem.findAll();

        // Render the view with the provided data
        res.render("list", {
            listTitle: "Today",
            newListItems: items,
        });

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

app.post("/delete", async (req, res) => {
    try {
        const deleteItemId = req.body.checkbox; // Assuming checkbox is the name of your checkbox input
        console.log("deleting item with this id : " + deleteItemId);
        // Use the provided listItem.delete method
        const result = await listItem.delete(deleteItemId);

        // Check if the deletion was successful
        if (result) {
            console.log("Item deleted successfully.");
        } else {
            console.log("Item not found or deletion unsuccessful.");
        }

        // Redirect back to the main page after deletion
        res.redirect("/");
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
app.post("/add", async (req, res) => {
    try {
        //inserting new item
        const newitem = {
            name: "SE262!",
        };
        await listItem.create(newitem); // <- remove here

        // Redirect back to the main page after deletion
        res.redirect("/");
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
