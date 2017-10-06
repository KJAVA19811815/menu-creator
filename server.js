require("dotenv").config();

const ENV = process.env.ENV || "development";

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/menus", (req, res) => {
  return knex("menus")
    .select()
    .then(function(menus) {
      console.log(menus);
      res.render("index", { menus: menus });
    });
});

app.get("/menus/new", (req, res) => {
  res.render("new");
});

app.post("/menus", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let price = req.body.price;
  let description = req.body.description;

  knex("menus")
    .insert({
      name: name,
      image: image,
      price: price,
      description: description
    })
    .then(function(result) {
      console.log("it works");
      res.redirect("/menus");
    });
});

app.listen(3000, () => {
  console.log("server at 3000");
});
