// server.js
// where your node app starts

// Dependencies: A set of statements to import dependencies
var express = require('express');
var url = require('url');
var request = require('request');

// Instantiations: A set of statements to create objects
var app = express();

// Configurations: A set of statements to configure system and custom settings
app.use(express.static('public'));

// Middleware: A set of statements that is executed for every incoming request

// Routes: A set of statements that defines server routes, endpoints, and pages
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/imagesearch/:term", function (req, res) {
  const term = req.params.term;
  const offset = url.parse(req.url, true).query.offset;
  
  searchImages(term, offset, function(err, images) {
    res.send(images);
  });
});

// Bootup: A set of statements that starts the server and makes it listen on a specific port for incoming requests
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


function searchImages(term, offset, callback) {  
  // Get page from offset parameter
  var page = isNaN(offset) ? 1 : (+offset*10 + 1);
  
  // Create api url
  var params = {
    q: term,
    cx: "010241553826995913188:789puu3wzjw",
    searchType: 'image',
    start: page,
    key: process.env.APIKEY
  };
  const url = "https://www.googleapis.com/customsearch/v1?" + encodeQueryData(params);
  
  // Call api
  request(url, function(error, response, body) {
    if(error) callback(error);
    
    // Parse json response
    const data = JSON.parse(body);
    var result = [];
    data.items.forEach((item) => {
      result.push({
        url: item.link,
        snippet: item.snippet,
        thumbnail: item.image.thumbnailLink,
        context: item.image.contextLink
      });
    });
    callback(null, result);
  });
}

function encodeQueryData(data) {
  var ret = [];
  for(var key in data) {
    ret.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
  }
  return ret.join('&');
}