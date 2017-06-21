// server.js
// where your node app starts

// Dependencies: A set of statements to import dependencies
var express = require('express');

// Instantiations: A set of statements to create objects
var app = express();

// Configurations: A set of statements to configure system and custom settings
app.use(express.static('public'));

// Middleware: A set of statements that is executed for every incoming request

// Routes: A set of statements that defines server routes, endpoints, and pages
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Bootup: A set of statements that starts the server and makes it listen on a specific port for incoming requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
