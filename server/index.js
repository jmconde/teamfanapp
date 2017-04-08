"use strict";

const PORT = 5051;
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const j = path.join;

const apiRouter = require("./routes/api-router.js");
const appRouter = require("./routes/app-router.js");

const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    // res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.set("views", j(__dirname, "templates"));
app.use("/assets", express.static(j(__dirname, "../build")));
app.set("view engine", "handlebars");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", appRouter);
app.use("/api", apiRouter);

app.listen(PORT, function () {
    console.log("%s listening at %s", app.name, PORT);
});
