var express = require('express');

var apiRouter = require("./api-router.js");

var app = express();


// app.set('views', './server/templates');
// app.use("/assets", express.static("./build"));
// app.set('view engine', 'handlebars');

// app.use("/", appRouter);
app.use("/api", apiRouter);

app.listen(5501, function() {
  console.log('%s listening at %s', app.name, 5501);
});