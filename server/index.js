const PORT = 5051;
const express = require("express");
const path = require("path");
const j = path.join;

const apiRouter = require("./api-router.js");
const appRouter = require("./app-router.js");

const app = express();

console.log(__dirname);
console.log(j(__dirname, '../build'));

app.set('views', j(__dirname, 'templates'));
app.use("/assets", express.static(j(__dirname, '../build')));
app.set('view engine', 'handlebars');

app.use("/", appRouter);
app.use("/api", apiRouter);

app.listen(PORT, function() {
  console.log('%s listening at %s', app.name, PORT);
});