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

app.listen(3000, () => {
  console.log("server at 3000");
});
