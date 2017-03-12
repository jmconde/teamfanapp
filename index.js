var restify = require('restify');
var router = require("./router.js");

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var server = restify.createServer();

router(server);

server.listen(5501, function() {
  console.log('%s listening at %s', server.name, server.url);
});